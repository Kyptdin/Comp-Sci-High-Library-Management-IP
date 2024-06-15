import { Button } from '@/components/ui/button'
import { useNavigate } from 'react-router-dom';

import { FaClipboardList } from "react-icons/fa";

export const AllBooks = () => {
  const navigate = useNavigate();

  return (
    <div className="mt-4 font-outfit">
        <Button 
          variant="link" 
          className="text-white text-md"
          onClick={() => navigate("/scourAllBooks")}
        >
            <FaClipboardList size={26} className="mr-3"/>
            Scour all books
        </Button>
    </div>
  )
}
