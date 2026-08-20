import Link from "next/link";
import { FiArrowUpRight } from "react-icons/fi";

const BookaCallBtn = ({ isheader = false }) => {
    return (
        <Link
            href="/contact"
            className={`group inline-flex items-center gap-3 px-4 py-2.5 bg-slate-950 text-white font-semibold text-sm md:text-base hover:bg-[#133bd4] transition-all duration-300 hover:scale-[1.02] ${isheader ? "" : "shadow-xl shadow-slate-950/20"}`}
        >
            <span>Book a call</span>
            <span className="flex items-center justify-center size-7 rounded-full bg-white/20 text-white group-hover:bg-white group-hover:text-[#133bd4] transition-colors">
                <FiArrowUpRight className="text-base transition-transform group-hover:rotate-45" />
            </span>
        </Link>
    )
}

export default BookaCallBtn;