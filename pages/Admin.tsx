import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { reportService } from '../services/api';
import { Report, ReportCategory } from '../types';
import { UploadCloud, CheckCircle, AlertCircle, Trash2, FileText, Search, LayoutList, Plus } from 'lucide-react';
import Card from '../components/UI/Card';
import { CATEGORY_LABELS } from '../constants';

const Admin = () => {
  const { user } = useAuth();
  
  // Tabs state
  const [activeTab, setActiveTab] = useState<'upload' | 'manage'>('upload');

  // Upload Form State
  const [formData, setFormData] = useState({
    title: '',
    category: ReportCategory.WEEKLY,
    subCategory: '',
    description: '',
    publicationDate: new Date().toISOString().split('T')[0],
    tags: '',
  });
  const [file, setFile] = useState<File | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle');

  // Manage State
  const [existingReports, setExistingReports] = useState<Report[]>([]);
  const [loadingReports, setLoadingReports] = useState(false);
  const [manageSearch, setManageSearch] = useState('');

  useEffect(() => {
    if (activeTab === 'manage') {
      fetchReports();
    }
  }, [activeTab]);

  const fetchReports = async () => {
    setLoadingReports(true);
    const data = await reportService.getAllReportsForAdmin();
    setExistingReports(data);
    setLoadingReports(false);
  };

  const handleDelete = async (id: string) => {
    if (window.confirm('האם אתה בטוח שברצונך למחוק דוח זה?')) {
      await reportService.deleteReport(id);
      fetchReports(); // Refresh list
    }
  };

  if (user?.role !== 'ADMIN') {
    return <div className="p-8 text-center text-red-600">אין הרשאה</div>;
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFile(e.target.files[0]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!file) return;

    setIsSubmitting(true);
    setStatus('idle');
    try {
      await reportService.uploadReport({
        title: formData.title,
        category: formData.category,
        subCategory: formData.category === ReportCategory.THEMATIC ? formData.subCategory : undefined,
        description: formData.description,
        publicationDate: new Date(formData.publicationDate).toISOString(),
        tags: formData.tags.split(',').map(t => t.trim()).filter(Boolean),
        fileUrl: 'mock-url'
      });
      setStatus('success');
      setFormData({
        title: '',
        category: ReportCategory.WEEKLY,
        subCategory: '',
        description: '',
        publicationDate: new Date().toISOString().split('T')[0],
        tags: '',
      });
      setFile(null);
      
      // Auto switch to manage list to show the new file
      setTimeout(() => setActiveTab('manage'), 1500);
    } catch (error) {
      setStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  const filteredManagementList = existingReports.filter(r => 
    r.title.toLowerCase().includes(manageSearch.toLowerCase()) || 
    r.category.toLowerCase().includes(manageSearch.toLowerCase())
  );

  return (
    <div className="p-8 max-w-6xl mx-auto">
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
        <div>
          <h2 className="text-2xl font-bold text-slate-900">ניהול מערכת</h2>
          <p className="text-slate-500">ניהול ספריית הדוחות והתוכן</p>
        </div>
        
        <div className="flex bg-slate-100 p-1 rounded-lg">
          <button 
            onClick={() => setActiveTab('upload')}
            className={`flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-md transition-all ${activeTab === 'upload' ? 'bg-white text-gov-900 shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}
          >
            <Plus size={16} />
            העלאת דוח חדש
          </button>
          <button 
            onClick={() => setActiveTab('manage')}
            className={`flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-md transition-all ${activeTab === 'manage' ? 'bg-white text-gov-900 shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}
          >
            <LayoutList size={16} />
            קטלוג קיים
          </button>
        </div>
      </div>

      {activeTab === 'upload' ? (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 animate-in fade-in duration-300">
          <div className="md:col-span-2">
              <Card title="אשף העלאת דוח">
                  <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                      <label className="block text-sm font-medium text-slate-700 mb-1">כותרת הדוח</label>
                      <input 
                      name="title" 
                      value={formData.title} 
                      onChange={handleInputChange} 
                      placeholder="לדוגמה: סקירה שבועית..."
                      className="w-full border border-slate-300 rounded-md p-2 focus:ring-2 focus:ring-gov-500 outline-none" 
                      required 
                      />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                      <div>
                          <label className="block text-sm font-medium text-slate-700 mb-1">קטגוריה</label>
                          <select 
                          name="category" 
                          value={formData.category} 
                          onChange={handleInputChange} 
                          className="w-full border border-slate-300 rounded-md p-2 outline-none"
                          >
                          {Object.entries(CATEGORY_LABELS).map(([key, label]) => (
                              <option key={key} value={key}>{label}</option>
                          ))}
                          </select>
                      </div>
                      <div>
                          <label className="block text-sm font-medium text-slate-700 mb-1">תאריך פרסום</label>
                          <input 
                          type="date"
                          name="publicationDate" 
                          value={formData.publicationDate} 
                          onChange={handleInputChange} 
                          className="w-full border border-slate-300 rounded-md p-2 outline-none" 
                          required 
                          />
                      </div>
                  </div>

                  {formData.category === ReportCategory.THEMATIC && (
                      <div className="bg-slate-50 p-4 rounded-md border border-slate-200">
                      <label className="block text-sm font-medium text-slate-700 mb-1">תת-נושא (לסקירה נושאית)</label>
                      <input 
                          name="subCategory" 
                          value={formData.subCategory} 
                          onChange={handleInputChange} 
                          placeholder="לדוגמה: אינפלציה, אגח ירוק"
                          className="w-full border border-slate-300 rounded-md p-2 outline-none bg-white" 
                          required
                      />
                      </div>
                  )}

                  <div>
                      <label className="block text-sm font-medium text-slate-700 mb-1">תקציר מנהלים / תיאור</label>
                      <textarea 
                      name="description" 
                      value={formData.description} 
                      onChange={handleInputChange} 
                      rows={3}
                      className="w-full border border-slate-300 rounded-md p-2 outline-none" 
                      required 
                      />
                  </div>

                  <div>
                      <label className="block text-sm font-medium text-slate-700 mb-1">קובץ הדוח</label>
                      <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-slate-300 border-dashed rounded-md hover:bg-slate-50 transition-colors group cursor-pointer">
                      <div className="space-y-1 text-center">
                          <UploadCloud className="mx-auto h-12 w-12 text-slate-400 group-hover:text-gov-500 transition-colors" />
                          <div className="flex text-sm text-slate-600 justify-center">
                          <label htmlFor="file-upload" className="relative cursor-pointer bg-transparent rounded-md font-medium text-gov-600 hover:text-gov-500 focus-within:outline-none">
                              <span>לחץ לבחירת קובץ</span>
                              <input id="file-upload" name="file-upload" type="file" className="sr-only" onChange={handleFileChange} required />
                          </label>
                          </div>
                          <p className="text-xs text-slate-500">PDF, PPTX, DOCX (עד 10MB)</p>
                          {file && (
                             <div className="flex items-center justify-center gap-2 mt-2 bg-gov-50 py-1 px-3 rounded text-gov-700 font-medium text-sm">
                                <FileText size={14} />
                                {file.name}
                             </div>
                          )}
                      </div>
                      </div>
                  </div>

                  <div>
                      <label className="block text-sm font-medium text-slate-700 mb-1">תגיות (מופרד בפסיקים)</label>
                      <input 
                      name="tags" 
                      value={formData.tags} 
                      onChange={handleInputChange} 
                      placeholder="לדוגמה: מאקרו, הנפקות, משקיעים זרים"
                      className="w-full border border-slate-300 rounded-md p-2 outline-none" 
                      />
                  </div>

                  <div className="flex items-center justify-between pt-4 border-t border-slate-100">
                      {status === 'success' && <span className="text-green-600 flex items-center gap-2 text-sm font-medium"><CheckCircle size={16}/> הועלה בהצלחה</span>}
                      {status === 'error' && <span className="text-red-600 flex items-center gap-2 text-sm font-medium"><AlertCircle size={16}/> שגיאה בהעלאה</span>}
                      {status === 'idle' && <span></span>}
                      
                      <button 
                      type="submit" 
                      disabled={isSubmitting}
                      className="bg-gov-800 text-white px-6 py-2.5 rounded-lg font-medium hover:bg-gov-900 transition-colors disabled:opacity-50 shadow-sm flex items-center gap-2"
                      >
                      {isSubmitting ? (
                          <>מעלה...</>
                      ) : (
                          <>
                             <UploadCloud size={18} /> פרסם דוח
                          </>
                      )}
                      </button>
                  </div>
                  </form>
              </Card>
          </div>
          
          <div className="md:col-span-1 space-y-6">
               <Card title="פעולות מהירות" className="bg-gradient-to-br from-gov-50 to-white">
                   <div className="space-y-3">
                      <button className="w-full text-right px-4 py-3 bg-white border border-gov-100 rounded-lg shadow-sm hover:shadow-md transition-shadow text-sm text-gov-800 font-medium">
                          ייבוא משרת (SharePoint)
                      </button>
                      <button className="w-full text-right px-4 py-3 bg-white border border-gov-100 rounded-lg shadow-sm hover:shadow-md transition-shadow text-sm text-gov-800 font-medium">
                          העלאת קבצים מרוכזת (Bulk)
                      </button>
                   </div>
               </Card>

               <Card title="הנחיות">
                   <ul className="list-disc list-inside text-xs text-slate-600 space-y-2">
                       <li>יש להקפיד על שם קובץ תקין.</li>
                       <li>פורמט PDF מומלץ לתאימות מירבית.</li>
                       <li>בסקירות נושאיות חובה להוסיף לפחות 3 תגיות.</li>
                   </ul>
               </Card>
          </div>
        </div>
      ) : (
        <div className="animate-in fade-in duration-300">
           <Card className="min-h-[500px]">
              <div className="flex justify-between items-center mb-6 pb-4 border-b border-slate-100">
                  <h3 className="font-bold text-slate-800">קטלוג דוחות</h3>
                  <div className="relative w-64">
                      <Search className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4" />
                      <input 
                        type="text" 
                        placeholder="סינון..."
                        value={manageSearch}
                        onChange={(e) => setManageSearch(e.target.value)}
                        className="w-full pr-9 pl-4 py-2 border border-slate-300 rounded-lg text-sm focus:ring-2 focus:ring-gov-500 outline-none"
                      />
                  </div>
              </div>

              {loadingReports ? (
                  <div className="text-center py-20 text-slate-400">טוען קטלוג...</div>
              ) : (
                  <div className="overflow-x-auto">
                    <table className="w-full text-right text-sm">
                        <thead className="bg-slate-50 text-slate-500 uppercase text-xs">
                            <tr>
                                <th className="px-4 py-3 rounded-r-md">תאריך</th>
                                <th className="px-4 py-3">כותרת</th>
                                <th className="px-4 py-3">קטגוריה</th>
                                <th className="px-4 py-3">הועלה ע"י</th>
                                <th className="px-4 py-3 text-left rounded-l-md">פעולות</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100">
                            {filteredManagementList.map(report => (
                                <tr key={report.id} className="hover:bg-slate-50 transition-colors">
                                    <td className="px-4 py-3 font-medium text-slate-600 whitespace-nowrap">
                                        {new Date(report.publicationDate).toLocaleDateString('he-IL')}
                                    </td>
                                    <td className="px-4 py-3 max-w-md truncate" title={report.title}>
                                        {report.title}
                                    </td>
                                    <td className="px-4 py-3">
                                        <span className="px-2 py-1 bg-slate-100 rounded text-xs text-slate-600 border border-slate-200">
                                            {CATEGORY_LABELS[report.category] || report.category}
                                        </span>
                                    </td>
                                    <td className="px-4 py-3 text-slate-500">
                                        {report.uploadedBy}
                                    </td>
                                    <td className="px-4 py-3 text-left">
                                        <button 
                                            onClick={() => handleDelete(report.id)}
                                            className="text-red-400 hover:text-red-600 hover:bg-red-50 p-2 rounded transition-colors"
                                            title="מחיקה / ארכוב"
                                        >
                                            <Trash2 size={16} />
                                        </button>
                                    </td>
                                </tr>
                            ))}
                            {filteredManagementList.length === 0 && (
                                <tr>
                                    <td colSpan={5} className="text-center py-10 text-slate-400">
                                        לא נמצאו דוחות.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                  </div>
              )}
           </Card>
        </div>
      )}
    </div>
  );
};

export default Admin;