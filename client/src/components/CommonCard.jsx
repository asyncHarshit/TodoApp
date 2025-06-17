import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";

function CommonCard({
  title,
  description,
  extraTextStyles,
  footerContent,
  content,
  headerRightContent,
}) {
  return (
    <Card className="flex bg-gray-100 flex-col gap-6 rounded-2xl p-8 transition duration-300 hover:bg-white hover:shadow-2xl hover:shadow-gray-600/10 cursor-pointer">
      <CardHeader className="p-0">
        <div className="flex justify-between items-start">
          {title ? (
            <CardTitle
              className={`text-2xl max-w-[250px] break-words font-semibold text-gray-950 ${
                extraTextStyles ? extraTextStyles : ""
              }`}
              style={{ wordBreak: "break-word", overflowWrap: "break-word" }}
            >
              {title}
            </CardTitle>
          ) : null}
          {headerRightContent ? headerRightContent : null}
        </div>
        <div className="flex justify-start">
          {description ? (
            <CardDescription className="mt-3 text-gray-600 break-words" style={{ wordBreak: "break-word", overflowWrap: "break-word" }}>
              {description}
            </CardDescription>
          ) : null}
        </div>
      </CardHeader>
      {content ? <CardContent className="p-0">{content}</CardContent> : null}
      <CardFooter className="p-0">{footerContent}</CardFooter>
    </Card>
  );
}

export default CommonCard;