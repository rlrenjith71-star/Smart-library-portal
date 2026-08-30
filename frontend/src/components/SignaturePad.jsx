import { useRef } from "react";
import SignatureCanvas from "react-signature-canvas";

export default function SignaturePad({ onSave }) {
  const signatureRef = useRef(null);

    function clearSignature() {
        signatureRef.current.clear();
          }

            function saveSignature() {
                if (signatureRef.current.isEmpty()) {
                      alert("Please provide your signature first");
                            return;
                                }

                                    const signature =
                                          signatureRef.current
                                                  .getTrimmedCanvas()
                                                          .toDataURL("image/png");

                                                              onSave(signature);
                                                                }

                                                                  return (
                                                                      <div>
                                                                            <div className="signature-wrapper">
                                                                                    <SignatureCanvas
                                                                                              ref={signatureRef}
                                                                                                        penColor="black"
                                                                                                                  canvasProps={{
                                                                                                                              className: "signature-box"
                                                                                                                                        }}
                                                                                                                                                />
                                                                                                                                                      </div>

                                                                                                                                                            <div className="signature-actions">
                                                                                                                                                                    <button
                                                                                                                                                                              type="button"
                                                                                                                                                                                        className="secondary-action"
                                                                                                                                                                                                  onClick={clearSignature}
                                                                                                                                                                                                          >
                                                                                                                                                                                                                    Clear
                                                                                                                                                                                                                            </button>

                                                                                                                                                                                                                                    <button
                                                                                                                                                                                                                                              type="button"
                                                                                                                                                                                                                                                        className="primary-btn"
                                                                                                                                                                                                                                                                  onClick={saveSignature}
                                                                                                                                                                                                                                                                          >
                                                                                                                                                                                                                                                                                    Save Signature
                                                                                                                                                                                                                                                                                            </button>
                                                                                                                                                                                                                                                                                                  </div>
                                                                                                                                                                                                                                                                                                      </div>
                                                                                                                                                                                                                                                                                                        );
                                                                                                                                                                                                                                                                                                        }