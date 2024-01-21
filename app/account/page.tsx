import { currentUser, UserProfile  } from "@clerk/nextjs";

import Heading from "@/components/heading"

export async function generateMetadata() {
    const user = await currentUser();

    if (user) {
        return {
            title: `حساب ${user?.firstName}`,
        };
    }

    return {
        title: `حسابي`,
    };
}

function AccountPage() {

    return (
        <div className="mt-24">
            <Heading title="حسابي" />
            <div className='mx-auto w-fit flex flex-col gap-6 text-center mb-16'>
                <UserProfile />
            </div>
        </div>
    )
}

export default AccountPage;