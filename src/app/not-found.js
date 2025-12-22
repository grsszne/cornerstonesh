import ErrorDisplay from "@/components/ErrorDisplay";

export const metadata = {
    title: "404 - Signal Lost | Cornerstone",
    description: "The requested module could not be located.",
};

export default function NotFound() {
    return (
        <ErrorDisplay
            code="404"
            title="Page Not Found."
            description="The page you are looking for cannot be found."
            action={{
                label: "Return to Home",
                href: "/"
            }}
        />
    );
}
