import GiftCard from "../components/GiftCard"

export default function GiftCardsPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8 text-secondary">Gift Cards</h1>
      <div className="max-w-md mx-auto">
        <GiftCard />
      </div>
    </div>
  )
}

