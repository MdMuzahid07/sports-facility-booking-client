import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@radix-ui/react-label"

const AddFacility = () => {
    // {
    //     "name": "Football Court",
    //         "description": "Outdoor football court with synthetic surface.",
    //             "pricePerHour": 40,
    //                 "location": "456 Sports Ave, Springfield"
    // }

    return (
        <div className="py-10">
            <h1 className="gap-8 text-3xl md:text-4xl lg:text-5xl xl:text-7xl font-extrabold">
                Add Facility
            </h1>
            <div className="bg-white p-8 rounded-lg mt-14 min-h-[450px]  relative">
                <form className="grid sm:grid-cols-2 gap-8 h-full">
                    <div>
                        <Label htmlFor="picture">Facility Name</Label>
                        <Input type="text" placeholder="Facility Name" />
                    </div>
                    <div>
                        <Label htmlFor="location">Location</Label>
                        <Input id="location" type="text" placeholder="Facility Location" />
                    </div>
                    <div>
                        <Label htmlFor="price">Price Per Hour</Label>
                        <Input id="price" type="text" placeholder="Facility price per hour" />
                    </div>
                    <div>
                        <Label htmlFor="picture">Picture</Label>
                        <Input id="picture" type="file" />
                    </div>
                    <div>
                        <Label htmlFor="des">Facility Description</Label>
                        <Textarea id="des" placeholder="write here " />
                    </div>
                    <div className="absolute right-8 bottom-8">
                        <Button className="text-lg">Add</Button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default AddFacility