import { GameBookingModal } from "@/components/games/game-booking-modal";
import { useEffect, useState } from "react";
import { useNavigate, useParams, useSearchParams } from "react-router";

const BookGame = () => {
  const navigate = useNavigate();
  const { gameId } = useParams();
  const [searchParams] = useSearchParams();
  const [bookingSheetOpen, setBookingSheetOpen] = useState(true);
  const startTime = searchParams.get("startTime");
  const endTime = searchParams.get("endTime");
  const date = searchParams.get("date");
  const convertedDate = date;

  const handleGoBack = () => {
    if (
      globalThis.window &&
      globalThis.window.history.state &&
      globalThis.window.history.state.idx > 0
    )
      navigate(-1);
    else navigate(`/games/${gameId}`, { replace: true });
  };

  useEffect(() => {
    if (!bookingSheetOpen) {
      setTimeout(() => {
        handleGoBack();
      }, 200);
    }
  }, [bookingSheetOpen]);

  if (!startTime || !endTime || !date || !convertedDate) {
    navigate(`/games/${gameId}`, { replace: true });
    return;
  }

  return (
    <GameBookingModal
      open={bookingSheetOpen}
      setOpen={setBookingSheetOpen}
      date={convertedDate}
    />
  );
};

export default BookGame;
