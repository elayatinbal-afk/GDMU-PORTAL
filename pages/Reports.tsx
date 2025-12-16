import React, { useEffect, useState, useMemo } from 'react';
import { useParams } from 'react-router-dom';
import { reportService } from '../services/api';
import { Report, ReportCategory } from '../types';
import { CATEGORY_LABELS } from '../constants';
import { Search, Filter, Download, Eye, FileText, X, ExternalLink, Printer } from 'lucide-react';
import Card from '../components/UI/Card';

const Reports = () => {
  const { category } = useParams<{ category: ReportCategory }>();
  const [reports, setReports] = useState<Report[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  
  // Viewer State
  const [selectedReport, setSelectedReport] = useState<Report | null>(null);

  // Filters
  const [search, setSearch] = useState('');
  const [dateFrom, setDateFrom] = useState('');
  const [dateTo, setDateTo] = useState('');

  useEffect(() => {
    const fetchReports = async () => {
      setIsLoading(true);
      const data = await reportService.getReports(category);
      setReports(data);
      setIsLoading(false);
    };
    fetchReports();
  }, [category]);

  const filteredReports = useMemo(() => {
    return reports.filter(r => {
      const matchesSearch = r.title.toLowerCase().includes(search.toLowerCase()) ||
                            r.tags.some(t => t.toLowerCase().includes(search.toLowerCase()));
      const matchesDateFrom = dateFrom ? new Date(r.publicationDate) >= new Date(dateFrom) : true;
      const matchesDateTo = dateTo ? new Date(r.publicationDate) <= new Date(dateTo) : true;
      
      return matchesSearch && matchesDateFrom && matchesDateTo;
    });
  }, [reports, search, dateFrom, dateTo]);

  const formatDate = (isoString: string) => {
    return new Date(isoString).toLocaleDateString('he-IL', {
      day: 'numeric', month: 'short', year: 'numeric'
    });
  };

  const handleDownload = () => {
    if (!selectedReport) return;
    
    // Fallback text content download
    const content = selectedReport.textContent || selectedReport.description;
    const blob = new Blob([content], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    
    const link = document.createElement('a');
    link.href = url;
    link.download = `${selectedReport.title.replace(/[\/\\]/g, '-')}.txt`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const handlePrintView = () => {
    if (!selectedReport) return;
    
    const newWindow = window.open('', '_blank');
    if (!newWindow) {
        alert('אנא אפשר חלונות קופצים כדי לצפות בדו"ח');
        return;
    }

    // Prioritize HTML content for print
    const contentBody = selectedReport.htmlContent 
      ? selectedReport.htmlContent 
      : `<div style="white-space: pre-wrap; font-family: sans-serif;">${selectedReport.textContent || selectedReport.description}</div>`;

    newWindow.document.write(`
      <!DOCTYPE html>
      <html dir="rtl">
      <head>
        <title>${selectedReport.title}</title>
        <link href="https://fonts.googleapis.com/css2?family=Assistant:wght@300;400;600;700&display=swap" rel="stylesheet">
        <style>
           body { font-family: 'Assistant', sans-serif; padding: 0; margin: 0; color: #1e293b; background: white; }
           .print-container { padding: 40px; max-width: 210mm; margin: 0 auto; }
           @media print {
             body { margin: 0; }
             .print-container { padding: 0; max-width: 100%; width: 100%; }
             @page { margin: 15mm; }
           }
        </style>
      </head>
      <body>
        <div class="print-container">
            ${contentBody}
        </div>
        <script>
            window.onload = () => { setTimeout(() => window.print(), 500); }
        </script>
      </body>
      </html>
    `);
    newWindow.document.close();
  };

  return (
    <div className="p-8 max-w-7xl mx-auto min-h-screen">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
        <div>
          <h2 className="text-2xl font-bold text-slate-900 flex items-center gap-2">
            <span className="bg-gov-100 p-1.5 rounded-lg text-gov-700">
               <FileText className="w-6 h-6" />
            </span>
            {category ? CATEGORY_LABELS[category] : 'כל הדוחות'}
          </h2>
          <p className="text-slate-500 mt-1">ארכיון הפצות וסקירות אגף</p>
        </div>
      </div>

      <Card className="mb-6">
        <div className="flex flex-col lg:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4" />
            <input 
              type="text" 
              placeholder="חיפוש לפי כותרת, תגית או תיאור..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pr-9 pl-4 py-2 border border-slate-300 rounded-lg text-sm focus:ring-2 focus:ring-gov-500 focus:border-gov-500 outline-none"
            />
          </div>
          <div className="flex gap-2 items-center">
             <div className="relative">
                <input 
                  type="date" 
                  value={dateFrom}
                  onChange={(e) => setDateFrom(e.target.value)}
                  className="px-2 py-2 border border-slate-300 rounded-lg text-sm focus:ring-2 focus:ring-gov-500 outline-none text-slate-600"
                />
             </div>
             <span className="text-slate-400">-</span>
             <div className="relative">
                <input 
                  type="date" 
                  value={dateTo}
                  onChange={(e) => setDateTo(e.target.value)}
                  className="px-2 py-2 border border-slate-300 rounded-lg text-sm focus:ring-2 focus:ring-gov-500 outline-none text-slate-600"
                />
             </div>
             <button 
              className="p-2 border border-slate-300 rounded-lg hover:bg-slate-50 text-slate-600"
              onClick={() => {setSearch(''); setDateFrom(''); setDateTo('');}}
              title="נקה סינונים"
             >
                <Filter className="w-4 h-4" />
             </button>
          </div>
        </div>
      </Card>

      <div className="bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden">
        {isLoading ? (
          <div className="p-12 text-center text-slate-500">טוען דוחות...</div>
        ) : filteredReports.length === 0 ? (
          <div className="p-12 text-center text-slate-500">לא נמצאו דוחות התואמים לחיפוש.</div>
        ) : (
          <table className="w-full text-right border-collapse">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200">
                <th className="py-4 px-6 text-xs font-semibold text-slate-500 uppercase tracking-wider w-32">תאריך</th>
                <th className="py-4 px-6 text-xs font-semibold text-slate-500 uppercase tracking-wider">כותרת ותיאור</th>
                {category === ReportCategory.THEMATIC && (
                  <th className="py-4 px-6 text-xs font-semibold text-slate-500 uppercase tracking-wider w-40">נושא</th>
                )}
                <th className="py-4 px-6 text-xs font-semibold text-slate-500 uppercase tracking-wider w-32">תגיות</th>
                <th className="py-4 px-6 text-xs font-semibold text-slate-500 uppercase tracking-wider text-left w-24">פעולות</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredReports.map((report) => (
                <tr key={report.id} className="hover:bg-slate-50/80 transition-colors group">
                  <td className="py-4 px-6 text-sm text-slate-600 font-medium whitespace-nowrap">
                    {formatDate(report.publicationDate)}
                  </td>
                  <td className="py-4 px-6">
                    <div 
                      onClick={() => setSelectedReport(report)}
                      className="font-semibold text-gov-900 group-hover:text-gov-700 transition-colors cursor-pointer"
                    >
                      {report.title}
                    </div>
                    <div className="text-xs text-slate-500 mt-1 line-clamp-1">{report.description}</div>
                  </td>
                  {category === ReportCategory.THEMATIC && (
                    <td className="py-4 px-6 text-sm">
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-slate-100 text-slate-800">
                        {report.subCategory}
                      </span>
                    </td>
                  )}
                  <td className="py-4 px-6">
                    <div className="flex flex-wrap gap-1">
                      {report.tags.map(tag => (
                        <span key={tag} className="text-[10px] uppercase bg-slate-100 text-slate-500 px-1.5 py-0.5 rounded border border-slate-200">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </td>
                  <td className="py-4 px-6 text-left">
                    <div className="flex justify-end gap-2">
                       <button 
                        onClick={() => setSelectedReport(report)}
                        className="text-slate-400 hover:text-gov-600 p-1" 
                        title="צפה בדוח"
                       >
                        <Eye className="w-4 h-4" />
                       </button>
                       <button 
                        onClick={() => {
                            setSelectedReport(report);
                        }}
                        className="text-slate-400 hover:text-gov-600 p-1" 
                        title="הורדה"
                       >
                        <Download className="w-4 h-4" />
                       </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
      
      <div className="mt-4 flex justify-center">
         <div className="text-xs text-slate-400">מציג {filteredReports.length} תוצאות</div>
      </div>

      {/* Report View Modal */}
      {selectedReport && (
        <div className="fixed inset-0 bg-black/50 z-[100] flex items-center justify-center p-4 backdrop-blur-sm">
          <div className="bg-white rounded-2xl w-full max-w-4xl shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200 flex flex-col max-h-[95vh]">
            <div className="bg-gov-900 px-6 py-4 flex justify-between items-start shrink-0">
              <div className="pl-8">
                <h3 className="text-lg font-bold text-white leading-tight">{selectedReport.title}</h3>
                <p className="text-gov-200 text-xs mt-1">פורסם: {formatDate(selectedReport.publicationDate)} | ע"י: {selectedReport.uploadedBy}</p>
              </div>
              <button 
                onClick={() => setSelectedReport(null)}
                className="text-gov-300 hover:text-white transition-colors"
              >
                <X size={20} />
              </button>
            </div>
            
            <div className="p-0 overflow-y-auto custom-scrollbar flex-1 bg-slate-50">
               {selectedReport.htmlContent ? (
                   // Render Rich HTML Content directly
                   <div 
                     className="bg-white min-h-full p-8 shadow-sm"
                     dangerouslySetInnerHTML={{ __html: selectedReport.htmlContent }} 
                   />
               ) : (
                   // Fallback for plain text reports
                   <div className="p-8">
                        <div className="flex gap-4 mb-6 text-sm">
                            <div className="bg-white px-3 py-1.5 rounded-lg border border-slate-200 text-slate-600 font-medium">
                                {CATEGORY_LABELS[selectedReport.category]}
                            </div>
                            {selectedReport.tags.map(t => (
                                <div key={t} className="bg-white px-3 py-1.5 rounded-lg border border-slate-200 text-slate-500">
                                    # {t}
                                </div>
                            ))}
                        </div>
                        <div className="prose prose-sm max-w-none text-slate-800 bg-white p-6 rounded-lg border border-slate-100 whitespace-pre-wrap">
                             {selectedReport.textContent || selectedReport.description}
                        </div>
                   </div>
               )}
            </div>

            <div className="p-4 border-t border-slate-100 bg-white shrink-0 flex gap-3 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.05)]">
                <button 
                onClick={handleDownload}
                className="flex-1 bg-slate-100 text-slate-700 hover:bg-slate-200 py-2.5 rounded-lg font-medium flex items-center justify-center gap-2 transition-colors"
                >
                <Download size={18} /> הורדת טקסט
                </button>
                <button 
                    onClick={handlePrintView}
                    className="flex-1 bg-gov-800 text-white py-2.5 rounded-lg font-medium flex items-center justify-center gap-2 hover:bg-gov-900 transition-colors shadow-sm"
                >
                <Printer size={18} /> הדפסה / שמירה כ-PDF
                </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Reports;