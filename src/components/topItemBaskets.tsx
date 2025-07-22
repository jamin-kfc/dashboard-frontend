import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

type topItemBaskets = {
    id: number,
    itemsets: string[],
    no: number,
    support: number
}[]

const url = "http://127.0.0.1:5000/api/102/itemGroups/"

const response = await fetch(url);
if (!response.ok) {
    console.log("Error fetching cardNames");
}

const results: topItemBaskets = await response.json();

const numEntries = 6;

export default function TopItemBaskets() {


    return (
        <> 
            {true ? (
                <>            
                    <Card className="py-0">
                         <CardHeader className="flex flex-col items-stretch border-b !p-0 sm:flex-row">
                            <div className="flex flex-1 flex-col justify-center gap-1 px-6 pt-4 pb-3 sm:!py-0">
                                <CardTitle>Top ItemSets</CardTitle>
                                <CardDescription>Most frequently appearing sets of items</CardDescription>
                            </div>
                        </CardHeader>
                        <CardContent>      
                            <Table>
                                <TableHeader>
                                <TableRow>
                                    <TableHead className="w-[100px]">Support</TableHead>
                                    <TableHead className="text-center">Itemset</TableHead>
                                </TableRow>
                                </TableHeader>
                                <TableBody>
                                {results.slice(0, numEntries).map(iSet =>
                                    <TableRow key={iSet.id}>
                                        <TableCell className="font-medium">{iSet.support}</TableCell>
                                        <TableCell className="text-center">{iSet.itemsets}</TableCell>
                                    </TableRow>
                                )}
                                </TableBody>
                            </Table>
                        </CardContent>
                        </Card>
                </>
            ) : null}
        </>

    )
}