import Heading from "@/components/heading"
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion"

export async function generateMetadata() {
    
    return {
        title: `تواصل معنا`,
    };
}

function ConatctPage() {

    const fQ: {question: string, answer: string}[] = [
        {
            question: "هل احتاج انشئ حساب إلكتروني في ليسيريا عشان اطلب؟",
            answer: "الإجابة : نعم، يتيح لك الاستفادة من برنامج الولاء وحفظ طلباتك السابقة ,و استلام الإشعارات والإستفادة من العروض."
        },
        {
            question: "كيف اطلب ليسيريا بيتزا للتوصيل؟",
            answer: "الإجابة : يمكنك الطلب من خلال تطبيق ليسيريا بيتزا أو الموقع ."
        },
        {
            question: "هل يوجد حد أدنى للطلب؟",
            answer: "الإجابة : لا يوجد حد ادنى للطلب ."
        },
        {
            question: "كم دقيقة ياخذ الطلب ليكون جاهز في ليسيريا بيتزا؟",
            answer: "الإجابة : للطلبات أقل من ١٠٠ ريال ، ياخذ الطلب ١٢ دقيقة من الوقت للإعداد. ."
        },
    ]

    return (
        <div className="mt-24">
            <Heading title="تواصل" />
            <div className="text-center text-lg bg-primary py-3 text-white rounded-lg mx-4">
                <p className="text-center text-lg mb-3 leading-8">عندك سؤال؟ تواصل مع احد ممثلي خدمة العملاء.  وبيكون سعيد بمساعدتك على الرقم : </p>
                <h3 className="text-lg">920123456</h3>
            </div>
            <div className="w-[90%] sm:w-3/4 mx-auto">
                <h1 className="text-3xl mt-10 ">الأسئلة الشائعة</h1>
                <Accordion type="single" collapsible>
                    {fQ.map((item, i) => (
                        <AccordionItem value={`${i.toString()} Accordion`} className="text-xl" key={item.question}>
                            <AccordionTrigger className="border-b-2 border-primary pt-10 text-right leading-8">
                                {item.question}
                            </AccordionTrigger>
                            <AccordionContent className="text-lg p-4 py-8 bg-light text-primary">
                                {item.answer}
                            </AccordionContent>
                        </AccordionItem>
                    ))}
                </Accordion>
            </div>
        </div>
    )
}

export default ConatctPage;