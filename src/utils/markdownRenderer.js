export const renderMarkdown = (text) => {
    if (!text) return "<p class='text-slate-400 dark:text-gray-500 italic'>Nothing to preview yet...</p>";

    return text
        // Code blocks
        .replace(
            /```([\s\S]*?)```/g,
            "<pre class='bg-slate-100 dark:bg-gray-900 border border-slate-200 dark:border-gray-700 rounded-lg p-4 overflow-x-auto text-sm my-3'><code>$1</code></pre>"
        )
        // Inline code
        .replace(
            /`([^`]+)`/g,
            "<code class='bg-slate-100 dark:bg-gray-800 text-blue-600 dark:text-blue-400 px-1.5 py-0.5 rounded text-sm font-mono'>$1</code>"
        )
        // Images! ![alt](url)
        .replace(
            /\!\[(.*?)\]\((.*?)\)/g,
            "<img src='$2' alt='$1' class='max-w-full rounded-xl my-4 border border-slate-200 dark:border-gray-700 shadow-sm' />"
        )
        // Bold
        .replace(
            /\*\*(.+?)\*\*/g,
            "<strong class='font-semibold text-slate-900 dark:text-white'>$1</strong>"
        )
        // Italic
        .replace(/\*(.+?)\*/g, "<em>$1</em>")
        // Headings
        .replace(
            /^## (.+)$/gm,
            "<h2 class='text-xl font-bold text-slate-900 dark:text-white mt-4 mb-2'>$1</h2>"
        )
        .replace(
            /^# (.+)$/gm,
            "<h1 class='text-2xl font-bold text-slate-900 dark:text-white mt-4 mb-2'>$1</h1>"
        )
        // Lists
        .replace(
            /^- (.+)$/gm,
            "<li class='ml-4 list-disc text-slate-700 dark:text-gray-300'>$1</li>"
        )
        // Line breaks
        .replace(/\n/g, "<br/>");
};
