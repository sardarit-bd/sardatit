import Link from "next/link";
import { FiArrowUpRight } from "react-icons/fi";

const BookaCallBtn = ({ text = "Book a call", className = "" } = {}) => {
    return (
        <Link
            href="/contact"
            className={`bg-neutral-950 text-white hover:bg-neutral-800 text-xs sm:text-sm font-medium px-5 py-2.5 rounded-full inline-flex items-center gap-2 transition-colors cursor-pointer group ${className}`}
        >
            <span>{text}</span>
            <span className="flex items-center justify-center size-5 rounded-full bg-white/20 text-white group-hover:bg-white group-hover:text-neutral-950 transition-colors">
                <FiArrowUpRight className="text-xs transition-transform duration-300 group-hover:rotate-45" />
            </span>
        </Link>
    );
};

export default BookaCallBtn;
