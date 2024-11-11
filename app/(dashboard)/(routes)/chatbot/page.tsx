import { IconBadge } from "@/components/icon-badge";
import { Zap, Sun, TriangleAlert } from "lucide-react";

const ChatbotPage = () => {
    return ( 
        
        <div className="h-full flex items-center justify-center font-bold flex-col">
        <h1 className="text-4xl mb-20">
            NextAI 
        </h1>

            <div className="flex space-x-4">
                <div>
                    <div className="flex flex-col items-center justify-center mb-3 ">
                       
                    <IconBadge  icon={Sun}
                                      backgroundVariant="success"
                                      iconVariant="success"
                                      size="default"
                                      
                                    />

                        <h2>Examples</h2>    
                     
                    </div>    

                        <div className="space-y-2">
                            <p className="infoText">"What is Android Development?"</p>
                            <p className="infoText">"What is the difference between Java and Kotlin?"</p>
                            <p className="infoText">"Best programming lanuage for Android Development"</p>
                        </div>

                </div>    

                <div>
                    <div className="flex flex-col items-center justify-center mb-3 ">
                       
                    <IconBadge  icon={Zap}
                                      backgroundVariant="success"
                                      iconVariant="success"
                                      size="default"
                                      
                                    />

                        <h2>Capabilities</h2>    
                     
                    </div>    

                        <div className="space-y-2">
                            <p className="infoText">Understand user queries accurately using advanced NLP techniques for context-aware responses.</p>
                            <p className="infoText">Customize and update information to align the chatbot responses with your organization needs.</p>
                            <p className="infoText">Handle misunderstandings smoothly and offer helpful prompts to redirect users.</p>
                        </div>

                </div>    

                <div>
                    <div className="flex flex-col items-center justify-center mb-3 ">
                       
                    <IconBadge  icon={TriangleAlert}
                                      backgroundVariant="success"
                                      iconVariant="success"
                                      size="default"
                                      
                                    />

                        <h2>Limitations</h2>    
                     
                    </div>    

                        <div className="space-y-2">
                            <p className="infoText">Limited Domain Knowledge</p>
                            <p className="infoText">Sensitivity to Input Variability</p>
                            <p className="infoText">Inability to Access Real-Time Information</p>
                            <p className="infoText">Error Propagation</p>
                            <p className="infoText">Dependence on Training Data</p>

                        </div>

                </div>    
            </div>        
       
    </div>
    );
}
 
export default ChatbotPage;