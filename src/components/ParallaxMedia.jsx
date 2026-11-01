import { Media } from "./Cover";

export default function ParallaxMedia({ project, item, ratio = "16 / 9" }) {
  const isImage = item?.type === "image";
  return (
    <div className={`pmedia${isImage ? " pmedia-image" : ""}`} style={isImage ? undefined : { aspectRatio: ratio }}>
      <div className="pmedia-fill">
        <Media project={project} item={item} />
      </div>
    </div>
  );
}
