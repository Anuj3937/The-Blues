"use client"

import { useLoyalty } from "../contexts/LoyaltyContext"
import { useToast } from "@/components/ui/use-toast"
import Button3D from "./Button3D"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

const rewards = [
  { name: "₹500 Discount", points: 1000 },
  { name: "Free Shipping", points: 500 },
  { name: "Exclusive Product Access", points: 2000 },
]

export default function LoyaltyProgram() {
  const { points, usePoints } = useLoyalty()
  const { toast } = useToast()

  const handleRedeemReward = (rewardPoints: number, rewardName: string) => {
    if (usePoints(rewardPoints)) {
      toast({
        title: "Reward Redeemed",
        description: `You've successfully redeemed ${rewardName}`,
      })
    } else {
      toast({
        title: "Not Enough Points",
        description: "You don't have enough points to redeem this reward",
        variant: "destructive",
      })
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Your Loyalty Program</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-xl mb-4">Your current points: {points}</p>
        <h3 className="text-lg font-semibold mb-2">Available Rewards:</h3>
        <ul className="space-y-2">
          {rewards.map((reward, index) => (
            <li key={index} className="flex justify-between items-center">
              <span>
                {reward.name} ({reward.points} points)
              </span>
              <Button3D onClick={() => handleRedeemReward(reward.points, reward.name)}>Redeem</Button3D>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  )
}

