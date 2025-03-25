import { cn } from "@/lib/utils";

export default function EnvironmentBar() {
  const map: {
    [key: string]: {
      name: string;
      title: string;
      color: string;
    };
  } = {
    dev: {
      name: "development",
      title: "Development",
      color: "bg-blue-500",
    },
    preview: {
      name: "preview",
      title: "Preview",
      color: "bg-yellow-500",
    },
    production: {
      name: "production",
      title: "Production",
      color: "bg-green-500",
    },
  };

  const env = process.env.VERCEL_ENV ?? "development";

  if (env === "production") return null;

  const envTitle = map[env]?.title ?? "Development";
  const envColor = map[env]?.color ?? "bg-blue-500";
  const envClass = `text-white text-xs font-semibold px-2.5 py-0.5  ${envColor}`;

  return (
    <div className={cn("flex justify-center items-center ", envClass)}>
      <p>{envTitle}</p>
    </div>
  );
}
