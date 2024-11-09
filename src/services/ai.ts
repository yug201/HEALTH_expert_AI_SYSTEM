import { GoogleGenerativeAI } from '@google/generative-ai';

const genAI = new GoogleGenerativeAI('AIzaSyD3Vx2rSQrUo_K4cqqU9QEe_xMuUFzEHJk');
const model = genAI.getGenerativeModel({ model: 'gemini-1.5-pro-002' });

const HEALTH_EXPERT_PROMPT = `You are an experienced health expert and medical consultant. 
You have access to the user's health metrics including blood pressure, heart rate, sleep patterns, 
and other vital signs. Your role is to:
1. Analyze health trends and provide professional insights
2. Offer personalized health advice and recommendations
3. Interpret medical reports and explain them in simple terms
4. Alert users about potential health risks based on their metrics
Please maintain a professional yet friendly tone and always prioritize user's health and safety.`;

const REPORT_ANALYSIS_PROMPT = `Please analyze this medical report/image and provide:
1. A clear interpretation of the results/findings
2. Any abnormal values or concerning findings
3. Simple explanations of medical terms
4. General recommendations based on the findings
Keep the explanation clear and easy to understand for patients.`;

export const chatWithAI = async (
  message: string,
  healthMetrics?: any,
  reportAnalysis?: string
) => {
  const chat = model.startChat({
    history: [{ role: 'assistant', parts: [HEALTH_EXPERT_PROMPT] }],
  });

  const contextMessage = `
    Current Health Context:
    ${healthMetrics ? JSON.stringify(healthMetrics) : 'No metrics available'}
    ${reportAnalysis ? `Recent Report Analysis: ${reportAnalysis}` : ''}
    
    User Message: ${message}
  `;

  const result = await chat.sendMessage(contextMessage);
  const response = await result.response;
  return response.text();
};

export const analyzeImage = async (imageData: string) => {
  try {
    // Create a vision-enabled model
    const visionModel = genAI.getGenerativeModel({ model: 'gemini-1.5-pro-002' });

    // Remove the data URL prefix to get just the base64 data
    const base64Data = imageData.split(',')[1];

    // Create a FileObject for the image
    const imageFileData = {
      inlineData: {
        data: base64Data,
        mimeType: 'image/jpeg'
      }
    };

    // Generate content with both the image and the analysis prompt
    const result = await visionModel.generateContent([
      REPORT_ANALYSIS_PROMPT,
      imageFileData
    ]);

    const response = await result.response;
    return response.text();
  } catch (error) {
    console.error('Error analyzing image:', error);
    throw new Error('Failed to analyze the image. Please try again.');
  }
};