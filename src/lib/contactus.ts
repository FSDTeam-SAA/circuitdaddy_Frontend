
export async function contactUs(payload: { firstName: string, lastName: string, emailAddress: string, message: string, phoneNumber: string }) {
    const data = {
        firstName: payload.firstName,
        lastName: payload.lastName,
        email: payload.emailAddress,
        phoneNumber: payload.phoneNumber,
        message: payload.message,
    }
    const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/contact`, {

        method: "POST",

        headers: {
            "Content-Type": "application/json",
        },

        body: JSON.stringify(data),
    });

    const resData = await response.json();
    if (!response.ok) throw new Error(resData.message || "Something went wrong");
    return resData;
}