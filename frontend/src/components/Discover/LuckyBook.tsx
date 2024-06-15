import { Button } from '@/components/ui/button'
import { useNavigate } from 'react-router-dom';

import { IoDiceSharp } from "react-icons/io5";

export const LuckyBook = () => {
  const navigate = useNavigate();

  return (
    <div className="mt-4 font-outfit">
        <Button variant="link" className="text-green-500 text-md">
            <IoDiceSharp size={28} className="mr-3"/>
            I am feeling lucky!
        </Button>
    </div>
  )
}
