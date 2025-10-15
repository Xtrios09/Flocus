"use client";

type MyButtonProps = {
    label: string;
}

export default function MyButton({ label }: MyButtonProps) {
return (
    <div className="w-full place-content-center flex-1">
    <button className="flex-1 mx-10 w-33 border-2 border-dashed bg-[#3c3c3c] hover:bg-[#1e1e1e] border-[#4d4d4d] px-4 py-2 rounded-sm text-[#ededed]">
        {label}
    </button>
    <button className="flex-1 mx-10 w-33 border-2 border-dashed bg-[#3c3c3c] hover:bg-[#1e1e1e] border-[#4d4d4d] px-4 py-2 rounded-sm text-[#ededed]">
        {label}
    </button>
    <button className="flex-auto mx-10 w-33 border-2 border-dashed bg-[#3c3c3c] hover:bg-[#1e1e1e] border-[#4d4d4d] px-4 py-2 rounded-sm text-[#ededed]">
        {label}
    </button>
    </div>
);
}