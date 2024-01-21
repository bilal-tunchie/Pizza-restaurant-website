
import useDough from "@/hooks/useDough";
import RadioInput from "./radioInput"
import { ProductWithFlavours } from "@/types";
import { FiAlertCircle } from "react-icons/fi";


const doughs = ["سميكة", "رقيقة", "اطراف الجبنة"];
interface DoughPickerProps {
    data: ProductWithFlavours;
    setDough: React.Dispatch<React.SetStateAction<string>>;
    dough: string
}

function DoughPicker({ data, dough, setDough }: DoughPickerProps) {
    const doughHook = useDough();

    const onDoughDialog = (name: string) => {
        if (name) {
            doughHook.onOpen();
            doughHook.onDoughChange(name)
        }
    }

    return (
        <>
            {data.dough && <div className="bg-white rounded-2xl p-4 mt-4">
                <h3 className=" text-lg font-semibold">نوع العجينة</h3>
                <div className="flex items-center justify-between mt-5">
                    <RadioInput 
                        value={dough} 
                        items={doughs}
                        onChange={(value) => setDough(value)}
                        className="flex gap-5 flex-col"
                    />
                    <div className="flex flex-col gap-8">
                        {doughs.map((dough, i) => (
                            <div key={dough+i+i} role="button" onClick={() => onDoughDialog(doughs[i])}>
                                <FiAlertCircle size={20}/>
                            </div>
                            
                        ))}
                    </div>
                </div>
            </div>}
        </>
    )
}

export default DoughPicker