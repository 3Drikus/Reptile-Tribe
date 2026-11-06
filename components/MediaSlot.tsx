import AwaitingLabel from "@/components/AwaitingLabel";

export default function MediaSlot({ plain = false }: { plain?: boolean }) {
  return (
    <div className={plain ? "media-slot media-slot-plain" : "media-slot"}>
      <AwaitingLabel />
    </div>
  );
}
