import { motion } from "framer-motion";
import Link from "next/link";
import { FiArrowUpRight } from "react-icons/fi";

const SectionHeader = ({ tag, title1, title2, pre, link, btn, isBgWhite, width = "max-w-2xl" }) => {
    return (
        <div className="w-full flex flex-col md:flex-row md:items-end md:justify-between gap-8">
            <div className={`flex flex-col gap-4 ${width}`}>
                <p className={`text-md font-semibold tracking-wide uppercase ${isBgWhite ? 'text-gray-700' : 'text-gray-300'}`}>
                    / {tag}
                </p>

                <h2 className={`text-4xl md:text-5xl font-semibold tracking-tight leading-[1.12]  ${isBgWhite ? 'text-gray-700' : 'text-gray-100'}`}>
                    <span>
                        {title1}
                        <br />
                    </span>
                    {
                        title2 && (
                            <motion.span
                                className={`relative inline-block text-4xl md:text-5xl font-semibold tracking-tight leading-[1.12]`}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: false }}
                                transition={{ duration: 0.5, delay: 0.5 }}
                            >
                                {title2}
                            </motion.span>
                        )
                    }

                </h2>
                {
                    pre && (
                        <p className={`${width} text-sm md:text-base lg:text-lg text-left ${isBgWhite ? 'text-black/60 ' : 'text-white/60'}`}>
                            {pre}
                        </p>
                    )
                }
            </div>

            {
                link && (
                    <div className="shrink-0 flex">
                        <Link
                            href={link}
                            className={`group inline-flex items-center gap-3 px-4 py-2.5 font-semibold text-sm md:text-base transition-all duration-300 hover:scale-[1.02] shadow-xl shadow-slate-950/20 ${isBgWhite ? "bg-slate-950 text-white" : "bg-white text-slate-900"}`}
                        >
                            <span>{btn}</span>
                            <span className={`flex items-center justify-center size-7 rounded-full transition-colors ${isBgWhite ? "bg-white/20 text-white" : "bg-black/90 text-white"}`}>
                                <FiArrowUpRight className={`text-base transition-transform group-hover:rotate-45`} />
                            </span>
                        </Link>
                    </div>
                )
            }

        </div>
    )
}

export default SectionHeader;