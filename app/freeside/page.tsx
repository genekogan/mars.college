import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import SiteHeader from "@/components/site-header"
import SiteFooter from "@/components/site-footer"
import { ArrowRight } from "lucide-react"

export default function FreesidePage() {
  return (
    <div className="bg-white text-gray-900">
      <SiteHeader variant="opaque" />
      <main className="container mx-auto px-4 py-12 md:py-20">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900">Freeside</h1>
          </div>

          <div className="relative w-full h-96 rounded-lg overflow-hidden mb-12 shadow-lg">
            <Image
              src="/images/freeside/hero.jpg"
              alt="A wide shot of the Freeside settlement in the desert at dusk."
              fill
              className="object-cover"
              priority
            />
          </div>

          <div className="prose prose-lg max-w-none mx-auto text-gray-700">
            <p>
              Freeside is an on-Mars community within the larger Mars ecosystem that offers off-grid housing and other
              amenities but has no specific academic or programmatic focus. As a community (and assemblage of
              pallet-rack structures), our aim is to make Freeside a comfy and supportive home base so that Freesiders
              can interact with and explore the many Mars programs and/or develop their own independent projects.
            </p>

            <div className="relative w-full h-80 rounded-lg overflow-hidden my-8 shadow-md">
              <Image
                src="/images/freeside/structure-1.avif"
                alt="A pallet-rack structure under construction at Freeside."
                fill
                className="object-cover"
              />
            </div>

            <h2 className="text-3xl font-bold mt-12 mb-4">Freeside may be for you if...</h2>
            <ol className="list-decimal pl-6 space-y-4">
              <li>
                <strong>You don’t already have a plan for what you want to work on while you’re at Mars.</strong> There
                will be numerous programs offering classes at Mars that you will be encouraged to try. You can decide on
                a concentrated track after you arrive.
              </li>
              <li>
                <strong>
                  You have an independent project that doesn’t fit within the scope of the other Mars camps.
                </strong>{" "}
                Maybe you do know what you want to work on while you’re at Mars, but it doesn’t align with AI, off grid
                technology, bodyworks, or the physical environment around Bombay beach. Freeside could be a good fit for
                you especially if you’re self-motivated and used to working according to your own structure and
                schedule.
              </li>
              <li>
                <strong>You’re interested in living in an off-grid community but find yourself low on gear.</strong>{" "}
                Maybe this is your first time attending Mars (or anything like Mars). Maybe you’ll be arriving from
                Europe with nothing but a duffle bag. We will be building Freeside together and as a group making sure
                everyone’s basic needs are met.
              </li>
              <li>
                <strong>You just want to co-build a cool community and hang out in the desert for three months.</strong>{" "}
                Doing nothing is an important part of the artistic process. And also, there’s no need to justify your
                existence through productivity. We’re going to trust that you’re the expert on what you need to be doing
                at Mars, whether that’s a lot of a lot of things, a lot of one thing, or a lot of nothing.
              </li>
            </ol>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 my-12">
              <div className="relative w-full h-80 rounded-lg overflow-hidden shadow-md">
                <Image
                  src="/images/freeside/common-area.jpeg"
                  alt="The common area of Freeside with tables and chairs inside a pallet-rack structure."
                  fill
                  className="object-cover"
                />
              </div>
              <div className="relative w-full h-80 rounded-lg overflow-hidden shadow-md">
                <Image
                  src="/images/freeside/kitchen.avif"
                  alt="The kitchen area at Freeside with cooking supplies."
                  fill
                  className="object-cover"
                />
              </div>
            </div>

            <h2 className="text-3xl font-bold mt-12 mb-4">Housing</h2>
            <p>
              We will be located on Mars, in the desert about a mile from the nearest town. Past versions of Freeside
              have had a dorm structure made out of pallet racks, with fully or partially enclosed areas, and residents
              staying in tents or building their own cabin-like enclosures.
            </p>
            <p>
              Each year we build something different, depending on needs and inspiration. At minimum, we’ll have some
              kind of barrier to blunt the wind, some kind of roof cover to mitigate dust, rain, and sun, and places to
              insert water, power, and hanging out.
            </p>
            <p>
              The rest is up to us – if we want a cozy hangout space or toothbrushing station, we build it; if you want
              snazzy storage space or a moon-viewing window in your tent/tiny-dwelling, you build it. Some basic
              materials (e.g. pallet racks and plywood) will be provided, and there are a few tents and mattresses
              available from past years - if you/we want more, you/we have to make it happen yourself/ourselves.
            </p>
            <p>
              As a baseline, you can think of living in Freeside as camping in the desert for three months. But the
              experience can be whatever we want to make it. By our powers combined, we can aspire to glamping. At least
              some of us are returning Freesiders, and we promise it’s doable and even… kind of nice.
            </p>

            <h2 className="text-3xl font-bold mt-12 mb-4">Amenities</h2>
            <p>
              We will also have a kitchen (another pallet rack structure) with camp stoves, fridge, freezer, and pantry
              space. We will be organizing a regular weekly grocery run. (The nearest grocery store is a 40-minute drive
              away. You are, of course, free to go whenever you want if you have a car.) We will be fully solar-powered
              and have access to the internet and to running water in town. We will also figure out some sort of
              solution to showers, laundry, and toilets.
            </p>
            <p>
              If you have your own housing already (RV, car, tent, etc.) and just need access to the rest of the
              amenities, you are still welcome to join Freeside. If you are fully self-sufficient but would still like
              to be part of the Freeside community, you are also welcome to apply.
            </p>

            <div className="relative w-full h-80 rounded-lg overflow-hidden my-12 shadow-md">
              <Image
                src="/images/freeside/dining-area.avif"
                alt="A dining area inside a pallet-rack structure at Freeside."
                fill
                className="object-cover"
              />
            </div>

            <h2 className="text-3xl font-bold mt-12 mb-4">Communal Living</h2>
            <p>
              While Freeside won’t provide or require any artistic/academic participation, we will expect a certain
              amount of community buy-in. This contributing to camp services like Mars build weeks (if at all possible),
              power, water, trash, grocery runs, kitchen deep cleans etc. Freesiders were an active part of Mars’s
              communal kitchen last year, and we’d like to make a chill social eating space a part of our ongoing
              tradition.
            </p>
            <p>
              What this will look like in the upcoming year is up to us, but a relaxed working, chatting, eating, card
              games environment is something it would be great to see Freesiders contribute to the larger Mars
              community. In addition, as part of the larger Mars community, we will be benefiting hugely from the
              offerings of other programs and camps. As such, be prepared to pitch in on wider-Mars needs and
              activities, as well.
            </p>

            <h2 className="text-3xl font-bold mt-12 mb-4">Schedule</h2>
            <ul className="list-disc pl-6 space-y-3">
              <li>
                <strong>Build weeks:</strong> Monday, December 30th, 2024 through Sunday, January 12th, 2025. Some
                construction prep may happen in advance of these dates.{" "}
                <em>
                  Note: The biggest lift we have to do as a community will be constructing the dorms and kitchen/dining
                  area. It would be really really helpful if you’re able to participate in build weeks.
                </em>
              </li>
              <li>
                <strong>New years groundbreaking party:</strong> Tuesday, December 31st, 2024.
              </li>
              <li>
                <strong>Official semester start date:</strong> Monday, Jan 13th, 2025 (full moon.)
              </li>
              <li>
                <strong>Official semester end date:</strong> Sunday, April 13th, 2025
              </li>
              <li>
                <strong>Midterm event (tentative):</strong> Wednesday, February 12th, 2025 (full moon).
              </li>
              <li>
                <strong>Exhibition of work (tentative):</strong> Thursday, March 13th, 2025 (full moon) as "finals."
              </li>
            </ul>

            <p className="mt-8">Freeside is organized by Amy and Ben.</p>
          </div>

          <div className="text-center mt-16 border-t pt-12">
            <h2 className="text-3xl font-bold mb-2">Sound exciting? Apply today.</h2>
            <p className="text-gray-600 mb-6">
              Space is limited and participants are accepted on a first come, first serve basis.
            </p>
            <Button size="lg" asChild className="bg-black text-white hover:bg-gray-800">
              <Link
                href="https://docs.google.com/forms/d/e/1FAIpQLSeON-_N_rrD_ThblW_v5l5yCM0s8fgS1eiKYnRy8TV5nXs4lA/viewform"
                target="_blank"
                rel="noopener noreferrer"
              >
                Apply to Freeside <ArrowRight className="ml-2 w-5 h-5" />
              </Link>
            </Button>
          </div>
        </div>
      </main>
      <SiteFooter />
    </div>
  )
}
