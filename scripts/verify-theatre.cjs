const puppeteer = require('puppeteer-core');
const path = require('path');
const fs = require('fs');

async function run() {
  const screenshotsDir = path.join(__dirname, '..', 'screenshots');
  if (!fs.existsSync(screenshotsDir)) {
    fs.mkdirSync(screenshotsDir, { recursive: true });
  }

  const browser = await puppeteer.launch({
    executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
    headless: 'new',
    defaultViewport: { width: 1920, height: 1080 },
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-gpu']
  });

  const page = await browser.newPage();
  console.log('Navigating to http://localhost:5173...');
  await page.goto('http://localhost:5173', { waitUntil: 'networkidle2' });

  // Wait for initial hero animation
  await new Promise(r => setTimeout(r, 2500));
  await page.screenshot({ path: path.join(screenshotsDir, '01_homepage.png') });
  console.log('Saved 01_homepage.png');

  // Find and click "Play Our Story" button
  console.log('Clicking "Play Our Story 🎬"...');
  const playStoryBtn = await page.waitForSelector('button ::-p-text(Play Our Story)');
  await playStoryBtn.click();
  await new Promise(r => setTimeout(r, 1200));

  // Scene 1: Opening
  await page.screenshot({ path: path.join(screenshotsDir, '02_theatre_scene1_opening.png') });
  console.log('Saved 02_theatre_scene1_opening.png');

  // Let opening stage advance or click Begin The Story
  await new Promise(r => setTimeout(r, 5500));
  const beginBtn = await page.$('button ::-p-text(Begin The Story)');
  if (beginBtn) {
    await beginBtn.click();
  } else {
    await page.keyboard.press('ArrowRight');
  }
  await new Promise(r => setTimeout(r, 800));

  // Scene 2: Our Story (Online Beginning)
  await page.screenshot({ path: path.join(screenshotsDir, '03_theatre_scene2_story.png') });
  console.log('Saved 03_theatre_scene2_story.png');

  // Advance to Scene 3: First Meeting
  const nextVideoBtn = await page.$('button ::-p-text(Next: First Video Call)');
  if (nextVideoBtn) {
    await nextVideoBtn.click();
    await new Promise(r => setTimeout(r, 500));
    const meetBtn = await page.$('button ::-p-text(Scene 3: First Meeting)');
    if (meetBtn) await meetBtn.click();
  } else {
    await page.keyboard.press('ArrowRight');
  }
  await new Promise(r => setTimeout(r, 800));

  // Scene 3: First Meeting
  await page.screenshot({ path: path.join(screenshotsDir, '04_theatre_scene3_first_meeting.png') });
  console.log('Saved 04_theatre_scene3_first_meeting.png');

  // Advance to Scene 4: Memory Montage
  const montageBtn = await page.$('button ::-p-text(Scene 4: Memory Montage)');
  if (montageBtn) await montageBtn.click();
  else await page.keyboard.press('ArrowRight');
  await new Promise(r => setTimeout(r, 800));

  // Scene 4: Memory Montage
  await page.screenshot({ path: path.join(screenshotsDir, '05_theatre_scene4_montage.png') });
  console.log('Saved 05_theatre_scene4_montage.png');

  // Advance to Scene 5: Soundtrack
  const soundBtn = await page.$('button ::-p-text(Soundtrack)');
  if (soundBtn) await soundBtn.click();
  else await page.keyboard.press('ArrowRight');
  await new Promise(r => setTimeout(r, 800));

  // Scene 5: Soundtrack
  await page.screenshot({ path: path.join(screenshotsDir, '06_theatre_scene5_soundtrack.png') });
  console.log('Saved 06_theatre_scene5_soundtrack.png');

  // Advance to Scene 6: Letter
  const letterBtn = await page.$('button ::-p-text(Read Letter For Ayushi)');
  if (letterBtn) await letterBtn.click();
  else await page.keyboard.press('ArrowRight');
  await new Promise(r => setTimeout(r, 800));

  // Scene 6: Letter
  await page.screenshot({ path: path.join(screenshotsDir, '07_theatre_scene6_letter_envelope.png') });
  console.log('Saved 07_theatre_scene6_letter_envelope.png');

  // Click wax seal to open envelope
  const waxSeal = await page.$('div ::-p-text(Tap to open wax seal)');
  if (waxSeal) {
    await waxSeal.click();
    await new Promise(r => setTimeout(r, 800));
    await page.screenshot({ path: path.join(screenshotsDir, '08_theatre_scene6_letter_opened.png') });
    console.log('Saved 08_theatre_scene6_letter_opened.png');
  }

  // Advance to Scene 7: Birthday Reveal
  const bdayBtn = await page.$('button ::-p-text(Birthday Finale)');
  if (bdayBtn) await bdayBtn.click();
  else await page.keyboard.press('ArrowRight');
  await new Promise(r => setTimeout(r, 3200)); // wait for stardust & text reveal

  // Scene 7: Birthday Reveal
  await page.screenshot({ path: path.join(screenshotsDir, '09_theatre_scene7_birthday_reveal.png') });
  console.log('Saved 09_theatre_scene7_birthday_reveal.png');

  // Advance to Scene 8: Secret Surprise
  const surpriseBtn = await page.$('button ::-p-text(Scene 8: Secret Surprise)');
  if (surpriseBtn) await surpriseBtn.click();
  else await page.keyboard.press('ArrowRight');
  await new Promise(r => setTimeout(r, 800));

  // Scene 8: Secret Surprise
  await page.screenshot({ path: path.join(screenshotsDir, '10_theatre_scene8_surprise.png') });
  console.log('Saved 10_theatre_scene8_surprise.png');

  // Advance to Scene 9: Final Ending
  const finaleBtn = await page.$('button ::-p-text(Scene 9: Final Ending)');
  if (finaleBtn) await finaleBtn.click();
  else await page.keyboard.press('ArrowRight');
  await new Promise(r => setTimeout(r, 800));

  // Scene 9: Final Ending
  await page.screenshot({ path: path.join(screenshotsDir, '11_theatre_scene9_finale.png') });
  console.log('Saved 11_theatre_scene9_finale.png');

  // Test Director Mode Shortcut: Shift + D
  console.log('Testing Director Mode (Shift + D)...');
  await page.keyboard.down('Shift');
  await page.keyboard.press('KeyD');
  await page.keyboard.up('Shift');
  await new Promise(r => setTimeout(r, 800));

  // Director Mode Overlay
  await page.screenshot({ path: path.join(screenshotsDir, '12_theatre_director_mode.png') });
  console.log('Saved 12_theatre_director_mode.png');

  // Close Director Mode
  await page.keyboard.down('Shift');
  await page.keyboard.press('KeyD');
  await page.keyboard.up('Shift');
  await new Promise(r => setTimeout(r, 500));

  // Return to Normal Website
  console.log('Clicking "Return to Normal Website"...');
  const returnBtn = await page.$('button ::-p-text(Return to Normal Website)');
  if (returnBtn) await returnBtn.click();
  await new Promise(r => setTimeout(r, 1000));

  // Normal Website Returned
  await page.screenshot({ path: path.join(screenshotsDir, '13_returned_normal_website.png') });
  console.log('Saved 13_returned_normal_website.png');

  await browser.close();
  console.log('Verification finished successfully!');
}

run().catch((err) => {
  console.error('Error during verification:', err);
  process.exit(1);
});
