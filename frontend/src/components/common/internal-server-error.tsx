export const InternalServerErrorPage = () => {
  return (
    <main className="grid min-h-full place-items-center px-6 py-24 sm:py-32 lg:px-8">
      <div className="text-center">
        <p className="text-base font-semibold text-primary">500</p>
        <h1 className="mt-4 text-5xl font-semibold tracking-tight text-balance  sm:text-7xl">
          Internal Server Error
        </h1>
        <p className="mt-6 text-lg font-medium text-pretty text-gray-400 sm:text-xl/8">
          Something went wrong from our side. Please try again later
        </p>
      </div>
    </main>
  );
};
