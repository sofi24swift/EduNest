import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

async function startServer() {
  const app = express();
  app.use(express.json());

  const PORT = 3000;

  // Initialize Gemini with server-side environment credentials
  const rawApiKey = (process.env.GEMINI_API_KEY || "").trim();
  const hasApiKey = rawApiKey !== "" && rawApiKey !== "MY_GEMINI_API_KEY" && rawApiKey !== "undefined";
  
  console.log("-----------------------------------------");
  console.log("EduNest Server - Gemini API Key Detected:", hasApiKey);
  console.log("-----------------------------------------");

  const ai = new GoogleGenAI({
    apiKey: hasApiKey ? rawApiKey : "PLACEHOLDER", // Avoid SDK crash at init
    httpOptions: {
      headers: {
        'User-Agent': 'aistudio-build',
      }
    }
  });

  // API Route for AI Personal Recommendations Chatbot
  app.post("/api/recommend", async (req, res) => {
    try {
      const { message, history, userProfile, language } = req.body;
      
      // Fallback response when GEMINI_API_KEY is missing or invalid
      if (!hasApiKey) {
        console.warn("Gemini API call skipped: GEMINI_API_KEY is not defined in Secrets.");
        
        // Let's create a highly customized, helpful response based on the user's query and their profile
        let alertHeader = "";
        let recommendationText = "";
        
        if (language === 'ka') {
          alertHeader = "⚠️ *შენიშვნა:* EduNest AI სრულად მზადაა! გთხოვთ, დააყენოთ ნამდვილი **GEMINI_API_KEY** პლატფორმის **Settings > Secrets** მენიუში.\n\n";
          
          if (message.toLowerCase().includes("ქოვორქინგი") || message.toLowerCase().includes("სივრცე") || message.toLowerCase().includes("ადგილი")) {
            recommendationText = `გამარჯობა, ${userProfile?.name || 'სტუმარო'}! ჩემი ბაზის მიხედვით, თბილისში საუკეთესო მშვიდი სივრცეებია **Impact Hub** (ფაბრიკა, ნინოშვილის 8), **Terminal** (ჭავჭავაძეზე / აბაშიძეზე), და **EduNest Quiet Zone** (მარი ბროსეს 2). ეს ადგილები აღჭურვილია ულტრა-სწრაფი Wi-Fi-ით და იდეალურია სასწავლო მიზნებისთვის.`;
          } else if (message.toLowerCase().includes("კურს") || message.toLowerCase().includes("სწავლა") || message.toLowerCase().includes("აკადემია")) {
            recommendationText = `გამარჯობა, ${userProfile?.name || 'სტუმარო'}! ${userProfile?.interests?.join(', ') || 'ტექნოლოგიების'} მიმართულებით გირჩევდი გადახედო **EduNest**-ის კურირებულ IT კურსებს (Full-Stack განვითარება, UI/UX დიზაინი, ან Python-ის პროგრამირება). ასევე, გაეცანი **გრანტებისა და სტიპენდიების** განყოფილებას, სადაც სწავლის 30%-დან 100%-მდე დაფინანსებაა ხელმისაწვდომი!`;
          } else {
            recommendationText = `მოგესალმები, ${userProfile?.name || 'სასტუმრო'}! შენი მიზანია: **${userProfile?.studyGoal || 'განათლების მიღება'}**. ჩემი რეკომენდაციაა შეინარჩუნო ყოველდღიური აქტივობის რიტმი, გამოიყენო ჩვენი ჩაშენებული ხმაურის შემცირების სენსორები მშვიდი მუშაობისთვის და შეისწავლო კურირებული კურსები.`;
          }
        } else if (language === 'en') {
          alertHeader = "⚠️ *Note:* EduNest AI is ready! Please configure a real **GEMINI_API_KEY** in the **Settings > Secrets** panel in AI Studio.\n\n";
          
          if (message.toLowerCase().includes("coworking") || message.toLowerCase().includes("space") || message.toLowerCase().includes("place")) {
            recommendationText = `Hi, ${userProfile?.name || 'Guest'}! Quiet study spaces in Tbilisi equipped with backup power, fast internet, and rich coffee counters include **Impact Hub Tbilisi** (8 Ninoshvili St), **Terminal Coworking** (Chavchavadze Ave), and **EduNest Curation Suite** (Marie Brosse St).`;
          } else if (message.toLowerCase().includes("course") || message.toLowerCase().includes("study") || message.toLowerCase().includes("academy")) {
            recommendationText = `Hi, ${userProfile?.name || 'Guest'}! Since you are interested in **${userProfile?.interests?.join(', ') || 'Tech'}**, I highly recommend looking into our specialized Web Development & Python Curation Tracks on the Courses tab. They match your focus goal of "${userProfile?.studyGoal || 'Career build'}".`;
          } else {
            recommendationText = `Hello, ${userProfile?.name || 'Guest'}! Your learning goal is: **${userProfile?.studyGoal || 'Education growth'}**. To start, configure your active profile, browse local spaces, and try out our built-in customized soundscapes!`;
          }
        } else {
          alertHeader = "⚠️ *Hinweis:* EduNest AI ist bereit! Bitte konfigurieren Sie einen echten **GEMINI_API_KEY** unter **Settings > Secrets**.\n\n";
          recommendationText = `Hallo, ${userProfile?.name || 'Gast'}! Ihr Fokus liegt auf **${userProfile?.studyGoal || 'Lernen'}**. Für produktives Arbeiten in Tiflis empfehlen wir Co-Working-Plätze wie **Terminal** oder **Impact Hub** mit exzellentem WLAN und bequemen Arbeitsplätzen.`;
        }
        
        return res.json({ text: `${alertHeader}${recommendationText}` });
      }

      const systemInstructionKa = `შენ ხარ EduNest AI - პერსონალიზებული საგანმანათლებლო და კარიერული ასისტენტი. შენი მიზანია დაეხმარო სტუდენტებსა და პროფესიონალებს თბილისში შესაფერისი სამუშაო სივრცეების (coworking, ბიბლიოთეკები), კურსებისა და სასტიპენდიო გრანტების აღმოჩენაში.
      
მომხმარებლის პროფილი:
- სახელი: ${userProfile?.name || 'სტუმარი'}
- ინტერესები: ${userProfile?.interests?.join(', ') || 'ინტერესები ჯერ არ არის მითითებული'}
- ძირითადი მიზანი: ${userProfile?.studyGoal || 'სწავლა'}
- ელ-ფოსტა: ${userProfile?.email || 'უცნობი'}

ინფორმაცია:
მიეცი მომხმარებელს კონკრეტული რეკომენდაციები თბილისის სივრცეების, კურსებისა და გრანტების შესახებ, დააკავშირე მათ ინტერესებთან.
ისაუბრე თბილად, მეგობრულად და მოკლედ (მაქსიმუმ 2-3 მოკლე აბზაცი), რათა მოერგოს მობილური ჩატის ეკრანს. პასუხი გაეცი ქართულად!`;
 
      const systemInstructionEn = `You are EduNest AI - a personalized learning space and career recommendations assistant. Your goal is to help students, developers, and professionals find quiet study spaces (coworkings, libraries), relevant educational courses, and scholarship grants in Tbilisi, Georgia.

User Profile:
- Name: ${userProfile?.name || 'Guest'}
- Interests: ${userProfile?.interests?.join(', ') || 'Not specified'}
- Focus Goal: ${userProfile?.studyGoal || 'General learning'}
- Email: ${userProfile?.email || 'Guest'}

Information:
Give precise personalized recommendations aligning with their interests. Suggest quiet study spaces, custom programs, and grants.
Be warm, ultra-helpful, and concise (max 2-3 short paragraphs) to perfectly fit on a mobile mockup screen. Answer in English!`;
 
      const systemInstructionDe = `Sie sind EduNest AI - ein persönlicher Assistent für Lernräume und Karriereempfehlungen in Tiflis, Georgien. Ihr Ziel ist es, Studenten, Entwicklern und Fachleuten dabei zu helfen, ruhige Lernräume (Coworking-Spaces, Bibliotheken), relevante akademische Kurse und Stipendien zu finden.

Benutzerprofil:
- Name: ${userProfile?.name || 'Gast'}
- Interessen: ${userProfile?.interests?.join(', ') || 'Noch nicht angegeben'}
- Hauptziel: ${userProfile?.studyGoal || 'Lernen'}

Information:
Geben Sie präzise personalisierte Empfehlungen, die sich an ihren Interessen orientieren. Schlagen Sie ruhige Lernräume, maßgeschneiderte Programme und Stipendien vor.
Seien Sie herzlich, äußerst hilfreich und fassen Sie sich kurz (maximal 2-3 kurze Absätze), damit es perfekt auf einen mobilen Bildschirm passt. Antworten Sie auf Deutsch!`;
 
      let instruction = systemInstructionKa;
      if (language === 'en') {
        instruction = systemInstructionEn;
      } else if (language === 'de') {
        instruction = systemInstructionDe;
      }

      // Prepare contents utilizing @google/genai guidelines
      const mappedContents: any[] = [];
      if (history && history.length > 0) {
        history.forEach((h: any) => {
          mappedContents.push({
            role: h.role === 'user' ? 'user' : 'model',
            parts: [{ text: h.text }]
          });
        });
      }
      mappedContents.push({
        role: 'user',
        parts: [{ text: message }]
      });

      const response = await ai.models.generateContent({
        model: "gemini-3.5-flash",
        contents: mappedContents,
        config: {
          systemInstruction: instruction,
          temperature: 0.7,
        }
      });

      const text = response.text || "Response selection error.";
      res.json({ text });
    } catch (error: any) {
      console.error("Gemini Error:", error);
      res.status(500).json({ error: "Failed to generate AI response", details: error?.message || error });
    }
  });

  // Serve static files in production, use Vite middleware in dev
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
