"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import Button3D from "./Button3D"

const sizeGuideData = {
  XS: { chest: "32-34", waist: "26-28", hips: "34-36" },
  S: { chest: "35-37", waist: "29-31", hips: "37-39" },
  M: { chest: "38-40", waist: "32-34", hips: "40-42" },
  L: { chest: "41-43", waist: "35-37", hips: "43-45" },
  XL: { chest: "44-46", waist: "38-40", hips: "46-48" },
  "2XL": { chest: "47-49", waist: "41-43", hips: "49-51" },
}

export default function SizeGuide() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button3D>Size Guide</Button3D>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Size Guide</DialogTitle>
        </DialogHeader>
        <div className="mt-4">
          <table className="w-full">
            <thead>
              <tr>
                <th className="px-4 py-2 text-left">Size</th>
                <th className="px-4 py-2 text-left">Chest</th>
                <th className="px-4 py-2 text-left">Waist</th>
                <th className="px-4 py-2 text-left">Hips</th>
              </tr>
            </thead>
            <tbody>
              {Object.entries(sizeGuideData).map(([size, measurements]) => (
                <tr key={size}>
                  <td className="px-4 py-2">{size}</td>
                  <td className="px-4 py-2">{measurements.chest}"</td>
                  <td className="px-4 py-2">{measurements.waist}"</td>
                  <td className="px-4 py-2">{measurements.hips}"</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </DialogContent>
    </Dialog>
  )
}

