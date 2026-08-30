import crypto from "crypto";

// Temporary storage for demo OTPs
const otpStore = new Map();

export async function sendSMS(to, body) {
  console.log(`Demo SMS to ${to}: ${body}`);
  
    return {
        status: "sent"
          };
          }
          
          export async function sendOTP(phone) {
            // Generate random 6-digit OTP
              const otp = crypto
                  .randomInt(100000, 1000000)
                      .toString();
                      
                        // OTP expires after 10 minutes
                          const expiresAt =
                              Date.now() + 10 * 60 * 1000;
                              
                                // Store OTP temporarily
                                  otpStore.set(phone, {
                                      otp,
                                          expiresAt
                                            });
                                            
                                              console.log(
                                                  `Demo OTP for ${phone}: ${otp}`
                                                    );
                                                    
                                                      return {
                                                          status: "pending",
                                                              otp
                                                                };
                                                                }
                                                                
                                                                export async function verifyOTP(phone, code) {
                                                                  const storedData = otpStore.get(phone);
                                                                  
                                                                    if (!storedData) {
                                                                        return {
                                                                              status: "not_found"
                                                                                  };
                                                                                    }
                                                                                    
                                                                                      // Check expiry
                                                                                        if (Date.now() > storedData.expiresAt) {
                                                                                            otpStore.delete(phone);
                                                                                            
                                                                                                return {
                                                                                                      status: "expired"
                                                                                                          };
                                                                                                            }
                                                                                                            
                                                                                                              // Check OTP
                                                                                                                if (storedData.otp !== code) {
                                                                                                                    return {
                                                                                                                          status: "denied"
                                                                                                                              };
                                                                                                                                }
                                                                                                                                
                                                                                                                                  // Remove OTP after successful verification
                                                                                                                                    otpStore.delete(phone);
                                                                                                                                    
                                                                                                                                      return {
                                                                                                                                          status: "approved"
                                                                                                                                            };
                                                                                                                                          }
                                                                                                                                          