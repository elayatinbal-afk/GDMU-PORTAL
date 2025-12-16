import { ReportCategory, MarketGroup, Report, NewsItem } from './types';

export const APP_NAME = "פורטל אסטרטגיה";
export const DEPT_NAME = "היחידה לניהול החוב הממשלתי";

export const CATEGORY_LABELS: Record<ReportCategory, string> = {
  [ReportCategory.WEEKLY]: 'סקירה שבועית',
  [ReportCategory.MONTHLY]: 'סקירה חודשית',
  [ReportCategory.DAILY]: 'עדכון יומי',
  [ReportCategory.THEMATIC]: 'סקירות נושאיות',
};

// REAL DATA SNAPSHOT - UPDATED DECEMBER 2025
export const MOCK_MARKET_DATA: MarketGroup[] = [
  {
    groupName: "אג\"ח ממשלת ישראל (תשואות לפדיון)",
    metrics: [
      {
        id: 'shahar10y',
        label: 'ממשלתי שקלי 10ש (1025)',
        value: 4.01,
        unit: '%',
        change: 0.10, 
        changePercent: 1.0, 
        trend: 'UP',
        lastUpdated: '2025-12-10T10:00:00Z',
        source: 'Bloomberg',
        history: [{date: '1', value: 3.95}, {date: '2', value: 3.98}, {date: '3', value: 3.99}, {date: '4', value: 4.00}, {date: '5', value: 4.01}]
      },
      {
        id: 'shahar02y',
        label: 'ממשלתי שקלי שנתיים',
        value: 3.85, 
        unit: '%',
        change: 0.05,
        changePercent: 0.8,
        trend: 'UP',
        lastUpdated: '2025-12-10T10:00:00Z',
        source: 'Bloomberg',
        history: [{date: '1', value: 3.80}, {date: '2', value: 3.82}, {date: '3', value: 3.83}, {date: '4', value: 3.84}, {date: '5', value: 3.85}]
      },
      {
        id: 'galil10y',
        label: 'ממשלתי צמוד 10ש (גליל)',
        value: 1.90, 
        unit: '%',
        change: 0.02,
        changePercent: 0.53,
        trend: 'UP',
        lastUpdated: '2025-12-10T10:00:00Z',
        source: 'Bloomberg',
        history: [{date: '1', value: 1.88}, {date: '2', value: 1.88}, {date: '3', value: 1.89}, {date: '4', value: 1.89}, {date: '5', value: 1.90}]
      }
    ]
  },
  {
    groupName: "מדדים ושערי חליפין",
    metrics: [
      {
        id: 'ta35',
        label: 'ת"א 35',
        value: 3506.55,
        unit: 'נק\'',
        change: 39.5, 
        changePercent: 1.14,
        trend: 'UP',
        lastUpdated: '2025-12-10T10:00:00Z',
        source: 'TASE',
        history: [{date: '1', value: 3450}, {date: '2', value: 3460}, {date: '3', value: 3480}, {date: '4', value: 3490}, {date: '5', value: 3506}]
      },
      {
        id: 'usdils',
        label: 'דולר / שקל',
        value: 3.2379,
        unit: '₪',
        change: 0.002,
        changePercent: 0.06,
        trend: 'UP', 
        lastUpdated: '2025-12-10T10:00:00Z',
        source: 'BOI',
        history: [{date: '1', value: 3.21}, {date: '2', value: 3.22}, {date: '3', value: 3.22}, {date: '4', value: 3.23}, {date: '5', value: 3.2379}]
      },
      {
        id: 'sp500',
        label: 'S&P 500',
        value: 6870.4,
        unit: 'נק\'',
        change: 21.2,
        changePercent: 0.31,
        trend: 'UP',
        lastUpdated: '2025-12-10T10:00:00Z',
        source: 'Investing.com',
        history: [{date: '1', value: 6830}, {date: '2', value: 6840}, {date: '3', value: 6850}, {date: '4', value: 6860}, {date: '5', value: 6870}]
      }
    ]
  },
  {
    groupName: "מאקרו וסיכון (ישראל)",
    metrics: [
      {
        id: 'boi_rate',
        label: 'ריבית בנק ישראל',
        value: 4.25, 
        unit: '%',
        change: 0, 
        changePercent: 0,
        trend: 'FLAT',
        lastUpdated: '2025-12-10T10:00:00Z',
        source: 'BOI',
        history: [{date: '1', value: 4.25}, {date: '2', value: 4.25}, {date: '3', value: 4.25}, {date: '4', value: 4.25}, {date: '5', value: 4.25}]
      },
      {
        id: 'inflation',
        label: 'אינפלציה (12 חודשים)',
        value: 2.5,
        unit: '%',
        change: 0,
        changePercent: 0, 
        trend: 'FLAT',
        lastUpdated: '2025-12-10T10:00:00Z',
        source: 'CBS',
        history: [{date: '1', value: 2.4}, {date: '2', value: 2.5}, {date: '3', value: 2.5}, {date: '4', value: 2.5}, {date: '5', value: 2.5}]
      },
      {
        id: 'cds5y',
        label: 'CDS ישראל 5 שנים',
        value: 85, 
        unit: 'bps',
        change: -2.0,
        changePercent: -2.3,
        trend: 'DOWN', 
        lastUpdated: '2025-12-10T10:00:00Z',
        source: 'Bloomberg',
        history: [{date: '1', value: 90}, {date: '2', value: 89}, {date: '3', value: 88}, {date: '4', value: 86}, {date: '5', value: 85}]
      }
    ]
  }
];

// Reconstructed PDF Design HTML
const PDF_DESIGN_HTML = `
<div style="font-family: 'Assistant', sans-serif; direction: rtl; color: #1e293b; max-width: 210mm; margin: 0 auto;">
    
    <!-- Header -->
    <div style="display: flex; justify-content: space-between; align-items: center; border-bottom: 3px solid #1e40af; padding-bottom: 10px; margin-bottom: 20px;">
        <div>
            <h1 style="color: #1e40af; font-size: 24px; font-weight: 800; margin: 0;">סקירה שבועית לשבוע המסחר 30.11-5.12.25</h1>
            <div style="font-size: 14px; color: #64748b;">היחידה לניהול החוב הממשלתי | אגף החשב הכללי</div>
        </div>
        <img src="https://upload.wikimedia.org/wikipedia/he/thumb/c/c9/Accountant_General_%28Israel%29_logo.png/600px-Accountant_General_%28Israel%29_logo.png" style="height: 50px;" alt="Logo">
    </div>

    <!-- Market Data Tables Section -->
    <div style="display: flex; gap: 15px; margin-bottom: 30px; flex-wrap: wrap;">
        <!-- Stocks Table -->
        <div style="flex: 1; min-width: 200px;">
            <table style="width: 100%; border-collapse: collapse; font-size: 12px; box-shadow: 0 1px 3px rgba(0,0,0,0.1);">
                <thead>
                    <tr style="background-color: #1e40af; color: white;">
                        <th style="padding: 8px; text-align: right;">מניות</th>
                        <th style="padding: 8px; text-align: center;">שער</th>
                        <th style="padding: 8px; text-align: center;">שינוי יומי</th>
                        <th style="padding: 8px; text-align: center;">שינוי שבועי</th>
                    </tr>
                </thead>
                <tbody>
                    <tr style="background-color: #f8fafc;"><td style="padding: 6px;">S&P500</td><td style="text-align:center;">6870.4</td><td style="text-align:center; color: #16a34a;">0.19%</td><td style="text-align:center; color: #16a34a;">0.31%</td></tr>
                    <tr style="background-color: white;"><td style="padding: 6px;">נאסדק</td><td style="text-align:center;">23578.13</td><td style="text-align:center; color: #16a34a;">0.31%</td><td style="text-align:center; color: #16a34a;">0.91%</td></tr>
                    <tr style="background-color: #f8fafc;"><td style="padding: 6px;">דאקס</td><td style="text-align:center;">24028.14</td><td style="text-align:center; color: #16a34a;">0.61%</td><td style="text-align:center; color: #16a34a;">0.80%</td></tr>
                    <tr style="background-color: white;"><td style="padding: 6px;">ת"א 35</td><td style="text-align:center;">3506.55</td><td style="text-align:center; color: #16a34a;">1.14%</td><td style="text-align:center; color: #16a34a;">3.41%</td></tr>
                </tbody>
            </table>
        </div>

         <!-- Forex Table -->
        <div style="flex: 1; min-width: 200px;">
            <table style="width: 100%; border-collapse: collapse; font-size: 12px; box-shadow: 0 1px 3px rgba(0,0,0,0.1);">
                <thead>
                    <tr style="background-color: #1e40af; color: white;">
                        <th style="padding: 8px; text-align: right;">מט"ח וסחורות</th>
                        <th style="padding: 8px; text-align: center;">שער</th>
                        <th style="padding: 8px; text-align: center;">שינוי שבועי</th>
                    </tr>
                </thead>
                <tbody>
                    <tr style="background-color: #f8fafc;"><td style="padding: 6px;">שקל/דולר</td><td style="text-align:center;">3.2379</td><td style="text-align:center; color: #16a34a;">0.74%</td></tr>
                    <tr style="background-color: white;"><td style="padding: 6px;">שקל/אירו</td><td style="text-align:center;">3.771</td><td style="text-align:center; color: #16a34a;">0.24%</td></tr>
                    <tr style="background-color: #f8fafc;"><td style="padding: 6px;">נפט (ברנט)</td><td style="text-align:center;">63.75</td><td style="text-align:center; color: #16a34a;">2.20%</td></tr>
                </tbody>
            </table>
        </div>
    </div>

    <!-- Main Content Grid -->
    <div style="display: grid; grid-template-columns: 2fr 1fr; gap: 20px;">
        
        <!-- Right Column (Text) -->
        <div>
            <div style="background-color: #eff6ff; border-right: 4px solid #3b82f6; padding: 15px; margin-bottom: 20px;">
                <h2 style="color: #1e3a8a; margin-top: 0; font-size: 18px;">עיקרי הדברים</h2>
                <ul style="padding-right: 20px; line-height: 1.6; font-size: 14px;">
                    <li style="margin-bottom: 8px;"><strong>ישראל:</strong> השכר הממוצע האיץ הן במחירים השוטפים והן במחירים קבועים (ריאלי) ביחס לאשתקד. השכר הממוצע למשרת שכיר של עובדים ישראלים בספטמבר 2025 עמד על 14,058 ש"ח.</li>
                    <li style="margin-bottom: 8px;"><strong>ארה"ב:</strong> נתוני מדד המחירים (PCE) עלו בהתאם לצפי. שוק התעסוקה מציג חולשה, מה שתומך בהורדת ריבית בהחלטה הקרובה.</li>
                    <li style="margin-bottom: 8px;"><strong>אירופה:</strong> האינפלציה האיצה קלות ל-2.2%, והתוצר הציג צמיחה מתונה של 0.3%.</li>
                </ul>
            </div>

            <h3 style="color: #1e3a8a; border-bottom: 1px solid #cbd5e1; padding-bottom: 5px; margin-top: 25px;">ישראל - מאקרו</h3>
            <p style="font-size: 14px; line-height: 1.6; text-align: justify;">
                בחודש ספטמבר 2025 עמד השכר הממוצע למשרת שכיר של עובדים ישראלים על <strong>14,058 ש"ח</strong>, ורשם עלייה שנתית של 4.6%. השכר הריאלי עמד על 11,319 ש"ח והאיץ לקצב שנתי של 2.1%. מספר משרות השכיר הסתכם ב-4.063 מיליון.
                <br/><br/>
                <strong>תיירות:</strong> מספר הישראלים שיצאו מישראל בנובמבר עמד על כ-1,076 אלף, עלייה של 16%. כניסות תיירים עמדו על כ-127 אלף.
            </p>

            <h3 style="color: #1e3a8a; border-bottom: 1px solid #cbd5e1; padding-bottom: 5px; margin-top: 25px;">ארה"ב</h3>
            <p style="font-size: 14px; line-height: 1.6; text-align: justify;">
                מדד ה-PCE עלה ב-0.3% בספטמבר, עם קצב שנתי של 2.8%. נתוני התעסוקה במגזר הפרטי (ADP) הציגו ירידה של 32 אלף משרות, הנתון החלש ביותר מזה שנתיים וחצי.
            </p>
        </div>

        <!-- Left Column (Side Data) -->
        <div>
             <div style="background-color: #f1f5f9; padding: 15px; border-radius: 8px; margin-bottom: 20px;">
                <h4 style="margin: 0 0 10px 0; color: #334155; font-size: 16px;">אינפלציה בישראל</h4>
                <div style="display: flex; justify-content: space-between; margin-bottom: 5px; font-size: 13px;">
                    <span>12 חודשים אחרונים:</span>
                    <span style="font-weight: bold;">2.5%</span>
                </div>
                 <div style="display: flex; justify-content: space-between; margin-bottom: 5px; font-size: 13px;">
                    <span>ציפיות שנה קדימה:</span>
                    <span style="font-weight: bold;">2.1%</span>
                </div>
                 <div style="display: flex; justify-content: space-between; font-size: 13px;">
                    <span>מדד אוקטובר:</span>
                    <span style="font-weight: bold;">0.5%</span>
                </div>
             </div>

             <div style="border: 1px solid #e2e8f0; border-radius: 8px; overflow: hidden;">
                 <div style="background-color: #1e40af; color: white; padding: 8px; font-size: 14px; font-weight: bold; text-align: center;">הנפקות קונצרניות בולטות</div>
                 <table style="width: 100%; font-size: 11px; border-collapse: collapse;">
                    <tr style="border-bottom: 1px solid #e2e8f0;"><td style="padding: 6px;">אשטרום נכסים</td><td style="text-align: left; padding: 6px;">3.2%</td></tr>
                    <tr style="border-bottom: 1px solid #e2e8f0; background-color: #f8fafc;"><td style="padding: 6px;">בנק ירושלים</td><td style="text-align: left; padding: 6px;">2.6%</td></tr>
                    <tr style="border-bottom: 1px solid #e2e8f0;"><td style="padding: 6px;">סימד הולדינגס</td><td style="text-align: left; padding: 6px;">7.0%</td></tr>
                    <tr style="background-color: #f8fafc;"><td style="padding: 6px;">איסתא נכסים</td><td style="text-align: left; padding: 6px;">5.4%</td></tr>
                 </table>
             </div>
        </div>
    </div>
</div>
`;

export const MOCK_REPORTS: Report[] = [
  {
    id: 'rep_2025_dec_001',
    title: 'סקירה שבועית לשבוע המסחר 30.11-5.12.25',
    category: ReportCategory.WEEKLY,
    publicationDate: '2025-12-07T09:00:00Z',
    description: 'מדד S&P500 בשיא של 6870 נק\'. השקל מתחזק ל-3.23 מול הדולר. נתונים חיוביים בשוק העבודה בישראל: השכר הממוצע עלה ל-14,058 ש"ח.',
    fileUrl: '#',
    tags: ['מאקרו גלובלי', 'שוק המט"ח', 'שוק העבודה', 'אינפלציה', 'אג"ח ממשלתי'],
    uploadedBy: 'חן רייכמן',
    createdAt: '2025-12-07T09:00:00Z',
    updatedAt: '2025-12-07T09:00:00Z',
    isArchived: false,
    textContent: `סקירה שבועית 30.11-5.12.25. מדד S&P500 עלה ל-6870. השקל התחזק ל-3.2379. שכר ממוצע 14,058 ש"ח.`,
    htmlContent: PDF_DESIGN_HTML
  },
  {
    id: 'rep_2024_085',
    title: 'סקירה שבועית - השלכות הורדת הדירוג של מודי\'ס',
    category: ReportCategory.WEEKLY,
    publicationDate: '2024-10-06T08:00:00Z',
    description: 'ניתוח הורדת הדירוג של ישראל ב-2 דרגות לרמה של Baa1. השפעה מיידית על המרווחים בשווקים הבינלאומיים ועל גיוסי החוב המקומיים. תחזית להחלטת הריבית הקרובה.',
    fileUrl: '#',
    tags: ['דירוג אשראי', 'מודי\'ס', 'מרווחים', 'גיוס חוב'],
    uploadedBy: 'חן רייכמן',
    createdAt: '2024-10-06T08:00:00Z',
    updatedAt: '2024-10-06T08:00:00Z',
    isArchived: false,
  },
  {
    id: 'rep_2024_084',
    title: 'עדכון מאקרו - מדד המחירים לצרכן (ספטמבר)',
    category: ReportCategory.DAILY,
    publicationDate: '2024-10-15T16:30:00Z',
    description: 'מדד המחירים לצרכן ירד ב-0.2% בניגוד לתחזיות. האינפלציה השנתית התמתנה קלות אך נותרה מעל היעד. סעיף הדיור ממשיך להוביל את העליות בראייה שנתית.',
    fileUrl: '#',
    tags: ['אינפלציה', 'מדד המחירים', 'דיור'],
    uploadedBy: 'דניאל כהן',
    createdAt: '2024-10-15T16:30:00Z',
    updatedAt: '2024-10-15T16:30:00Z',
    isArchived: false,
  },
  {
    id: 'rep_2024_083',
    title: 'סקירה נושאית - ביצועי תקציב וגירעון מצטבר',
    category: ReportCategory.THEMATIC,
    subCategory: 'פיסקאלי',
    publicationDate: '2024-10-10T10:00:00Z',
    description: 'הגירעון המצטבר ל-12 חודשים המשיך לטפס והגיע ל-8.5% תוצר. ניתוח הכנסות המדינה ממיסים מול הוצאות המלחמה הגדלות.',
    fileUrl: '#',
    tags: ['גירעון', 'תקציב', 'מיסים'],
    uploadedBy: 'שרה לוי',
    createdAt: '2024-10-10T10:00:00Z',
    updatedAt: '2024-10-10T10:00:00Z',
    isArchived: false,
  }
];

export const MOCK_NEWS: NewsItem[] = [
  {
    id: 'n1',
    source: 'בלומברג',
    title: 'S&P 500 שובר שיאים: חצה את רף ה-6850 נקודות על רקע ציפיות לריבית',
    time: '11:20',
    sentiment: 'positive'
  },
  {
    id: 'n2',
    source: 'גלובס',
    title: 'השקל בשיא של שנתיים: נסחר סביב 3.23 מול הדולר',
    time: '09:45',
    sentiment: 'positive'
  },
  {
    id: 'n3',
    source: 'TheMarker',
    title: 'מדד המחירים לצרכן בארה"ב (PCE) עלה ב-0.3%; הריבית צפויה לרדת',
    time: 'אתמול',
    sentiment: 'neutral'
  },
  {
    id: 'n4',
    source: 'Bizportal',
    title: 'ת"א 35 מזנק ב-3.4% בסיכום שבועי; הבנקים מובילים את העליות',
    time: '10:00',
    sentiment: 'positive'
  },
  {
    id: 'n5',
    source: 'כלכליסט',
    title: 'השכר הממוצע במשק חצה את רף ה-14,000 ש"ח',
    time: '12:30',
    sentiment: 'positive'
  }
];