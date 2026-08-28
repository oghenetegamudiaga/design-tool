import { GeneratorModule } from '../types';
import { deviceMockupGenerator } from './device-mockup';

// M5 Extensibility: Generator registry pattern
const generatorRegistry = new Map<string, GeneratorModule>();

// Register V1 active generator
generatorRegistry.set(deviceMockupGenerator.id, deviceMockupGenerator);

// Register future extension stubs (e.g. Book Mockup, Social Frame) to verify modular architecture
const bookMockupStub: GeneratorModule = {
  id: 'book-mockup',
  name: 'Book / E-Book Cover',
  description: 'Hardcover 3D book mockup with spine and realistic lighting.',
  isAvailable: false,
  frameOptions: [],
  render: () => {
    // Stub for post-V1 milestone
  },
};

const socialFrameStub: GeneratorModule = {
  id: 'social-post',
  name: 'Social Post Frame',
  description: 'X / Instagram / LinkedIn verified post card mockups.',
  isAvailable: false,
  frameOptions: [],
  render: () => {
    // Stub for post-V1 milestone
  },
};

generatorRegistry.set(bookMockupStub.id, bookMockupStub);
generatorRegistry.set(socialFrameStub.id, socialFrameStub);

export function getGenerator(id: string): GeneratorModule {
  const mod = generatorRegistry.get(id);
  if (!mod) {
    return deviceMockupGenerator;
  }
  return mod;
}

export function getAllGenerators(): GeneratorModule[] {
  return Array.from(generatorRegistry.values());
}

export { deviceMockupGenerator };
