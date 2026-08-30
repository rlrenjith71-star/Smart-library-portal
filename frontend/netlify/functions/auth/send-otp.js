import { sendOTP } from "../../../lib/sms.js";

export default async (request) => {
  if (request.method !== "POST") {
      return Response.json(
            { success: false, message: "Method not allowed" },
                  { status: 405 }
                      );
                        }

                          try {
                              const { phone } = await request.json();

                                  if (!phone) {
                                        return Response.json(
                                                { success: false, message: "Phone number is required" },
                                                        { status: 400 }
                                                              );
                                                                  }

                                                                      const result = await sendOTP(phone);

                                                                          return Response.json({
                                                                                success: true,
                                                                                      message: "OTP sent successfully",
                                                                                            status: result.status,
                                                                                            demoOTP: result.otp
                                                                                                });
                                                                                                  } catch (error) {
                                                                                                      console.error(error);

                                                                                                          return Response.json(
                                                                                                                {
                                                                                                                        success: false,
                                                                                                                                message: error.message || "Unable to send OTP"
                                                                                                                                      },
                                                                                                                                            { status: 500 }
                                                                                                                                                );
                                                                                                                                                  }
                                                                                                                                                  }; 