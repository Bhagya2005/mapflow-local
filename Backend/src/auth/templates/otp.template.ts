export const getOtpTemplate = (name: string, otp: string) => {
  const year = new Date().getFullYear();
  
  return `
    <div style="font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; max-width: 600px; margin: 0 auto; background-color: #000000; color: #ffffff; padding: 40px 20px; border-radius: 24px;">
      <div style="text-align: center; margin-bottom: 40px;">
        <div style="display: inline-block; background-color: #7c5cfc; padding: 12px; border-radius: 12px;">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="3"></circle><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"></path></svg>
        </div>
        <h1 style="margin-top: 15px; font-size: 20px; font-weight: 900; letter-spacing: -0.05em; text-transform: uppercase; font-style: italic;">MapFlow</h1>
      </div>

      <div style="background: linear-gradient(145deg, #111111, #050505); border: 1px solid rgba(124, 92, 252, 0.2); padding: 40px; border-radius: 32px; box-shadow: 0 20px 40px rgba(0,0,0,0.4); text-align: center;">
        <h2 style="font-size: 24px; font-weight: 800; margin-bottom: 10px; color: #ffffff;">Verification Required</h2>
        <p style="color: #888888; font-size: 16px; margin-bottom: 30px;">Hi ${name}, use the code below to securely reset your MapFlow account password.</p>
        
        <div style="background-color: rgba(124, 92, 252, 0.1); border: 2px dashed #7c5cfc; padding: 20px; border-radius: 20px; display: inline-block; margin-bottom: 30px;">
          <span style="font-family: 'Courier New', monospace; font-size: 42px; font-weight: 900; letter-spacing: 12px; color: #7c5cfc; padding-left: 12px;">${otp}</span>
        </div>

        <p style="color: #666666; font-size: 13px; line-height: 1.5;">
          This verification code will expire in <span style="color: #7c5cfc; font-weight: bold;">5 minutes</span>.<br/>
          If you didn't request this, you can safely ignore this email.
        </p>
      </div>

      <div style="text-align: center; margin-top: 40px; padding-top: 20px; border-top: 1px solid #222222;">
        <p style="font-size: 12px; color: #444444; text-transform: uppercase; letter-spacing: 0.1em; font-weight: bold; margin-bottom: 15px;">Developed by Bhagya N. Patel</p>
        <div style="margin-bottom: 20px;">
          <a href="#" style="text-decoration: none; color: #7c5cfc; font-size: 12px; margin: 0 10px;">Documentation</a>
          <a href="#" style="text-decoration: none; color: #7c5cfc; font-size: 12px; margin: 0 10px;">Support</a>
          <a href="#" style="text-decoration: none; color: #7c5cfc; font-size: 12px; margin: 0 10px;">Privacy</a>
        </div>
        <p style="font-size: 11px; color: #333333;">&copy; ${year} MapFlow Engine. All rights reserved.</p>
      </div>
    </div>
  `;
};