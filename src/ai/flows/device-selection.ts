// This file implements the intelligent device selection flow using a Genkit tool.

'use server';

/**
 * @fileOverview Implements intelligent device selection for LLM execution.
 *
 * - `selectDevice`: Chooses the best available device (CPU/GPU) for running the LLM.
 * - `DeviceSelectionOutput`: The output type for the `selectDevice` function, indicating the chosen device.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const DeviceSelectionOutputSchema = z.object({
  device: z.string().describe('The selected device for LLM execution (e.g., CPU or GPU).'),
});
export type DeviceSelectionOutput = z.infer<typeof DeviceSelectionOutputSchema>;

async function checkDeviceAvailability(device: string): Promise<boolean> {
  // Simulate checking device availability.  In a real implementation, this would check
  // system resources to determine if the device is available and suitable for running the LLM.
  // For simplicity, we'll just return true for CPU and GPU.
  return device === 'CPU' || device === 'GPU';
}

const selectDeviceTool = ai.defineTool({
  name: 'selectDevice',
  description: 'Selects the best available device (CPU/GPU) for running the LLM based on availability and performance.',
  inputSchema: z.object({}),
  outputSchema: DeviceSelectionOutputSchema,
},
async () => {
  // In a real implementation, this would check for the availability of a GPU and its suitability for running the LLM.
  // For this example, we'll just default to CPU if a GPU is not available.
  const isGpuAvailable = await checkDeviceAvailability('GPU');
  const selectedDevice = isGpuAvailable ? 'GPU' : 'CPU';

  return {device: selectedDevice};
});

const deviceSelectionPrompt = ai.definePrompt({
  name: 'deviceSelectionPrompt',
  tools: [selectDeviceTool],
  prompt: `Determine the best device to use for running the LLM.  Call the selectDevice tool.`,
  output: {schema: DeviceSelectionOutputSchema},
});


const deviceSelectionFlow = ai.defineFlow({
    name: 'deviceSelectionFlow',
    inputSchema: z.object({}),
    outputSchema: DeviceSelectionOutputSchema,
  },
  async () => {
    const {output} = await deviceSelectionPrompt({});
    return output!;
  }
);

export async function selectDevice(): Promise<DeviceSelectionOutput> {
  return deviceSelectionFlow({});
}
