import VirtualTryOn from "../components/VirtualTryOn"

export default function VirtualTryOnPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8 text-secondary">Enhanced Virtual Try-On Experience</h1>
      <div className="mb-6 text-text">
        <p className="text-lg mb-2">Experience our clothing virtually with our enhanced try-on feature!</p>
        <ul className="list-disc list-inside space-y-1">
          <li>Start your camera to begin the virtual try-on.</li>
          <li>Select a shirt from the options provided.</li>
          <li>Use the sliders to adjust the size and position of the shirt.</li>
          <li>Capture an image of your virtual try-on to save or share.</li>
        </ul>
      </div>
      <VirtualTryOn />
    </div>
  )
}

