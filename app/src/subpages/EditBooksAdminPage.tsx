
import { Input } from "@/components/ui/input";

export const EditBooksAdminPage = () => {
    return (<div className="text-white w-[80%] p-4">
        <div className="p-4">
            <Input
                type="text"
                placeholder="Enter ISBN number"
                className="w-full px-4 py-2 mb-4 rounded-full text-lg text-black"
            />
        </div>
    </div>);
}