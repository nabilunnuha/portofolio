import { useEffect } from "react";

/**
 * Sets the document title on mount and resets to base title on unmount.
 * @param title - Page-specific title (e.g. "About", "Projects")
 * @param baseTitle - App-wide suffix (default: "nabilunnuha | Portfolio")
 */
const useDocumentTitle = (
	title: string,
	baseTitle = "nabilunnuha | Portfolio",
) => {
	useEffect(() => {
		if (title) {
			document.title = title;
		}
		return () => {
			document.title = baseTitle;
		};
	}, [title, baseTitle]);
};

export default useDocumentTitle;
