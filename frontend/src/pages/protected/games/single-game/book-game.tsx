import { GameBookingDialog } from "@/components/games/game-booking-dialog";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useNavigate, useParams, useSearchParams } from "react-router";

const BookGame = () => {
  const navigate = useNavigate();
  const { gameId } = useParams();
  const [searchParams] = useSearchParams();
  const [bookingSheetOpen, setBookingSheetOpen] = useState(true);
  const startTime = Number(searchParams.get("startTime"));
  const endTime = Number(searchParams.get("endTime"));
  const date = searchParams.get("date");

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

  useEffect(() => {
    if (!date) return;
    const bookingTime = new Date(
      new Date(date).setHours(Number(startTime) / 60, Number(startTime) % 60),
    );

    if (bookingTime < new Date()) {
      navigate(`/games/${gameId}`, { replace: true });
      toast.error("You cannot book on past date");
    }

    if (
      !startTime ||
      !endTime ||
      !date ||
      Number.isNaN(startTime) ||
      Number.isNaN(endTime) ||
      new Date(date).toString() == "Invalid Date"
    ) {
      navigate(`/games/${gameId}`, { replace: true });
    }
  }, []);

  if (!date) return;
  
  return (
    <GameBookingDialog
      open={bookingSheetOpen}
      setOpen={setBookingSheetOpen}
      date={date}
    />
  );
};

export default BookGame;
