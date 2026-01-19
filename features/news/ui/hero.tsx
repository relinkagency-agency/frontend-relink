import bg from "../../../public/hero-bg-2.jpg";
export default function Hero() {
  return (
    <>
      <div className="relative h-[520px] md:h-[650px] lg:h-[750px] w-full overflow-hidden">
        <img
          src={bg.src}
          alt="background"
          className="absolute inset-0 w-full md:h-full h-[520px] object-cover"
        />

        <div className="absolute text-white lg:top-80 lg:bottom-20 md:bottom-40 bottom-10 top-50 md:top-0 md:left-30 left-5 font-relink-headline text-5xl lg:text-7xl md:max-w-4xl max-w-2xl">
          <h1>Strategy, culture and creative. </h1>
        </div>
        <div className="absolute text-white bottom-30 md:bottom-30 left-5 md:left-0 lg:left-auto lg:right-20 font-relink-headline lg:text-4xl max-w-4xl uppercase">
          <div className="flex gap-2 font-relink-neue group">
            
            <a
              href="#"
              className="text-sm flex gap-1 items-center cursor-pointer ransition-transform duration-300 group-hover:translate-y-2"
            >
              <span className="tracking-wide leading-4 font-medium">
                Explore
              </span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="size-5 transition-transform duration-300 group-hover:translate-y-0"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15.75 17.25 12 21m0 0-3.75-3.75M12 21V3"
                />
              </svg>
            </a>
          </div>
        </div>
      </div>
      <p className="p-8 mb-[200px]">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Inventore
        nesciunt possimus id! Consequatur reprehenderit esse perspiciatis
        nostrum eveniet deleniti placeat quod sapiente obcaecati. Possimus
        deleniti iusto consequuntur sed, iste optio. m excepturi. Cupiditate
        voluptate molestiae quam accusantium veniam nobis magnam totam minima
        dolorem sequi quos officiis eveniet, porro nam, amet repellat, nostrum
        reprehenderit repellendus et atque veritatis rerum illum. Iusto
        exercitationem sint iure sequi voluptate voluptas, eius ipsum qui sed
        dolore quia adipisci, aut, perferendis quasi asperiores. Accusamus neque
        nostrum ab asperiores sequi commodi aliquid cupiditate earum veritatis
        possimus. Cum corporis culpa ratione blanditiis minus excepturi esse
        eius necessitatibus. Tempora consectetur quo dicta impedit numquam totam
        sunt! Ea nisi fugiat iste soluta deleniti. Vitae nulla animi perferendis
        sit. Quod! Delectus animi eaque ipsam itaque adipisci assumenda, commodi
        vitae error praesentium saepe quos exercitationem. Dolore, velit nam?
        Nulla, architecto voluptate autem est dignissimos doloremque eaque nam
        at eligendi optio natus! Dolorum, excepturi aliquid ducimus quaerat
        fugiat sequi, error quidem, veniam tenetur ipsam praesentium. Quas hic
        aliquid ratione vero quae impedit blanditiis dolorum fuga ipsam corporis
        tempore ut dolorem, quos magni! Ab voluptas maiores inventore, nisi
        beatae atque tempore neque. Possimus tempore aut unde. Cumque omnis
        delectus dicta nam asperiores odio a sed temporibus, nobis, velit
        debitis eos natus repellat corrupti. Ratione ipsa temporibus numquam
        optio maxime deleniti, eius consequatur minima facilis dolores rem
        cumque nam at veniam dolorum eligendi vero aliquid adipisci sed nobis
        nulla? Error veniam culpa saepe ad? Eligendi rerum quos inventore
        perspiciatis voluptates praesentium a id velit nam numquam obcaecati
        doloribus placeat possimus nemo consequuntur sapiente eveniet itaque,
        sed dolorem harum aliquid ratione? Qui facilis minima exercitationem?
      </p>
    </>
  );
}
