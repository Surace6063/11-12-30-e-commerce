import HeroSection from "../components/HeroSection"
import MaxWidthContainer from "../components/MaxWidthContainer"
import NewArrivals from "../components/NewArrivals"

const HomePage = () => {
  return (
    <div>
      <HeroSection />

      {/* new arrivals */}
      <MaxWidthContainer>
        <h1 className="text-slate-800 text-2xl font-semibold mb-6">
          New Arrivals
        </h1>
        <NewArrivals />
      </MaxWidthContainer>

    </div>
  )
}
export default HomePage