import { Navbar } from '@/components/Navbar';
import { ScrollArea } from '@/components/ui/scroll-area';

import { cn } from '@/lib/utils';
import { useState } from 'react';

const LETTERS: string[] = ("ABCDEFGHIJKLMNOPQRSTUVWXYZ").split("");

export const ScourAllBooks = () => {
    const [selectedLetter, setSelectedLetter] = useState<string | undefined>();

    return (
        <div className="min-h-screen bg-gradient-to-t from-gray-950 to-teal-950">
            <Navbar showNavbar={false} />

            <div className="full-center flex-col p-5 h-[80vh] font-outfit grid grid-cols-10">
                <div className="col-span-9 h-full w-full">
                    <p className="text-gray-400 text-3xl px-5">
                        Books that begin with "{selectedLetter || "_"}"
                    </p>

                    <ScrollArea className="w-full h-full">
                        
                    </ScrollArea>
                </div>

                <div className="full-center flex-col text-green-400 col-span-1">
                    {LETTERS.map((letter: string, key: number) => {
                        const isSelected = selectedLetter == letter;

                        return <button
                            key={key}
                            className={cn(
                                "m-0 p-0",
                                isSelected ? "text-2xl text-white font-bold" : "text-md",
                                "ease-linear duration-150"
                            )}
                            onClick={() => setSelectedLetter(letter)}
                        >{letter}</button>
                    })}
                </div>
            </div>
        </div>
    );
}
