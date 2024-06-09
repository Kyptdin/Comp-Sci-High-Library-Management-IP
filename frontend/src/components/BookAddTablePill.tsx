
import React from 'react'
import { useState } from 'react';
import {
    TableCell,
    TableRow,
  } from "@/components/ui/table"

import { isbnApiLink, fetchBookFromIsbn } from "@/utils/isbnApi";
import { dataInterface } from '@/types/csvBookInterface'; 

export const BookAddTablePill = ({ bookData }: {bookData: dataInterface}) => {
  let isbn = bookData.ISBN || "Not found"
  let copies = bookData.COPIES || 0;

  let [ title, setTitle ] = useState<string>("...");
//   fetchBookFromIsbn(isbnApiLink, {
//       arg: bookData.ISBN
//   }).then((bookDataFromGoogle) => {
//     //   console.log(bookDataFromGoogle);
//   });

  return <TableRow>
        <TableCell className="w-1/4 font-medium">{isbn}</TableCell>
        <TableCell className="w-1/4">{title}</TableCell>
        <TableCell className="w-1/4">{copies}</TableCell>
        <TableCell className="w-1/4 text-right">{title ? true  : false}</TableCell>
    </TableRow>
}