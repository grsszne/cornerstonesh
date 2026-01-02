import ErrorDisplay from "@/components/ErrorDisplay";

export const metadata = {
    title: "404 - Page Not Found",
    description: "The page you are looking for cannot be found.",
};

export default function NotFound() {
    return (
        <ErrorDisplay
            code="404"
            title="Page Not Found"
            description="The page you are looking for could not be found."
            action={{
                label: "Return to Home",
                href: "/"
            }}
        />
    );
}
