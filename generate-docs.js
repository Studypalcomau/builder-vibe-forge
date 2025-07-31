const puppeteer = require('puppeteer');
const fs = require('fs');
const path = require('path');

const pages = [
  // Public Pages
  { url: 'http://localhost:3000/', name: '01-homepage' },
  { url: 'http://localhost:3000/about', name: '02-about' },
  { url: 'http://localhost:3000/pricing', name: '03-pricing' },
  { url: 'http://localhost:3000/contact', name: '04-contact' },
  { url: 'http://localhost:3000/help', name: '05-help' },
  
  // Authentication
  { url: 'http://localhost:3000/login', name: '06-login' },
  { url: 'http://localhost:3000/signup', name: '07-signup' },
  
  // Student Dashboard
  { url: 'http://localhost:3000/dashboard', name: '08-student-dashboard' },
  { url: 'http://localhost:3000/subjects', name: '09-subjects-listing' },
  { url: 'http://localhost:3000/subjects/mathematical-methods', name: '10-subject-detail' },
  { url: 'http://localhost:3000/subjects/mathematical-methods/notes', name: '11-study-notes' },
  { url: 'http://localhost:3000/subjects/mathematical-methods/quizzes', name: '12-quiz-interface' },
  { url: 'http://localhost:3000/subjects/mathematical-methods/test', name: '13-comprehensive-test' },
  { url: 'http://localhost:3000/subjects/mathematical-methods/progress', name: '14-progress-tracking' },
  { url: 'http://localhost:3000/subjects/mathematical-methods/recommendations', name: '15-study-recommendations' },
  
  // Admin Interface
  { url: 'http://localhost:3000/admin', name: '16-admin-dashboard' },
  { url: 'http://localhost:3000/admin/subjects', name: '17-subject-management' },
  { url: 'http://localhost:3000/admin/subjects/mathematical-methods/edit', name: '18-subject-editor' },
  { url: 'http://localhost:3000/admin/subjects/mathematical-methods/questions', name: '19-question-bank' },
  { url: 'http://localhost:3000/admin/subjects/mathematical-methods/notes', name: '20-notes-management' },
  { url: 'http://localhost:3000/admin/subjects/mathematical-methods/complete-guide', name: '21-comprehensive-study-guide' },
  { url: 'http://localhost:3000/admin/generate', name: '22-content-generation' },
  { url: 'http://localhost:3000/admin/questions', name: '23-questions-management' },
];

async function generateDocumentation() {
  const browser = await puppeteer.launch({ headless: false });
  const page = await browser.newPage();
  
  // Set viewport to capture full desktop view
  await page.setViewport({ width: 1920, height: 1080 });
  
  // Create output directory
  const outputDir = './website-documentation';
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir);
  }
  
  console.log('Starting website documentation generation...');
  
  for (const pageInfo of pages) {
    try {
      console.log(`Capturing: ${pageInfo.name}`);
      
      await page.goto(pageInfo.url, { waitUntil: 'networkidle2', timeout: 30000 });
      
      // Wait for any dynamic content to load
      await page.waitForTimeout(2000);
      
      // Take full page screenshot
      await page.screenshot({
        path: path.join(outputDir, `${pageInfo.name}.png`),
        fullPage: true
      });
      
      // Generate PDF
      await page.pdf({
        path: path.join(outputDir, `${pageInfo.name}.pdf`),
        format: 'A4',
        printBackground: true,
        margin: { top: '1cm', bottom: '1cm', left: '1cm', right: '1cm' }
      });
      
    } catch (error) {
      console.error(`Error capturing ${pageInfo.name}:`, error.message);
    }
  }
  
  await browser.close();
  console.log('Documentation generation complete! Check ./website-documentation folder');
}

// Run the script
generateDocumentation().catch(console.error);
