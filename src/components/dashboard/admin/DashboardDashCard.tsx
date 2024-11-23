/* eslint-disable @typescript-eslint/no-explicit-any */
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

const DashboardDashCard = ({ cardInfo }: any) => {
    return (
        <Card className="w-full border-2 transition-all duration-200 delay-100 hover:shadow-xl bg-slate-100 hover:shadow-[#2E2E2E] hover:-translate-y-2 hover:scale-105 rounded-lg border-slate-100 hover:border-[#2E2E2E]">
            <CardHeader title="click to view details" className="p-0 cursor-pointer">

            </CardHeader>
            <CardContent title="click to view details" className="p-4">
                <CardTitle className="text-lg font-semibold cursor-pointer">{cardInfo?.title}</CardTitle>
                <div className="text-gray-700 mt-2 text-sm">
                    <p className="font-semibold md:font-bold text-3xl md:text-4xl">{cardInfo?.length}</p>
                </div>
            </CardContent>
        </Card>
    )
}

export default DashboardDashCard;