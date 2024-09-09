import { EmblaOptionsType } from 'embla-carousel';
import EmblaCarousel from '@/components/carousel/embla-carousel/EmblaCarousel';

const OPTIONS: EmblaOptionsType = { align: 'start' };
const SLIDE_COUNT = 10;
const SLIDES = Array.from(Array(SLIDE_COUNT).keys());

export default function Page() {
  return (
    <div>
      <div className="overflow-hidden bg-gray-300 py-20">
        <div className="container">
          <EmblaCarousel slides={SLIDES} options={OPTIONS} />
        </div>
      </div>

      <div className="py-20">
        <div className="container">
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Quae,
            voluptas? Aspernatur minima ut, numquam cum qui voluptatem aut enim
            sint iste perspiciatis ea rem ipsa commodi deserunt vel totam eum
            pariatur dolorum eligendi! Ratione eaque labore perferendis, iste
            autem sed, hic aliquam, quos ab dignissimos soluta eum ducimus id.
            Sequi nihil beatae dignissimos dolore blanditiis nisi! Sequi illo
            impedit eaque aliquam quod, et similique nulla, doloribus aspernatur
            fuga ex repellat mollitia a recusandae, fugiat corporis explicabo
            laudantium obcaecati repudiandae exercitationem. Quod eaque iusto
            nostrum nam, ex fugit odio ut deserunt tempore consectetur commodi
            architecto. Nulla iure praesentium qui, quam illo sapiente
            consectetur, deserunt necessitatibus voluptates in dolorum voluptas,
            tempore voluptatibus? Rerum suscipit placeat optio dolor natus
            voluptas atque! Soluta explicabo obcaecati doloribus recusandae
            quos, nostrum sapiente est, aliquam cum et beatae ea fuga possimus!
            Doloremque necessitatibus unde inventore distinctio assumenda,
            minima nulla odio nostrum labore molestiae laborum soluta laboriosam
            possimus repudiandae suscipit magnam blanditiis perferendis fugit!
            Ipsum consequuntur harum error sint vitae culpa, nostrum pariatur
            quasi iure nam qui voluptas et non voluptatum tenetur dolorem.
            Quaerat totam molestiae, ab eos natus magni sequi quod
            exercitationem cupiditate veniam, laboriosam ipsa adipisci sed
            eveniet debitis suscipit iusto recusandae rem. Minima optio nemo
            quas doloribus ex qui dolorem quae debitis quia. Quas ad deserunt
            odit explicabo at aliquid quia libero soluta, officia dolorem a,
            numquam voluptate, iure voluptas sunt veritatis eaque. Optio id iste
            asperiores exercitationem! Laudantium voluptatem sapiente ratione
            aliquid, est iusto nobis. Ipsum eos labore iusto provident. Repellat
            consequuntur accusamus tempore quo reprehenderit nam quas a
            voluptate culpa! Explicabo, quos voluptatum provident reprehenderit
            facilis delectus eum ducimus natus ab odit non velit repellendus
            aliquam incidunt ut exercitationem quod quia. Aliquam, repellat. Ex
            nulla maxime libero, quia ut deserunt ad vel eos nam quae ullam
            repellendus dolore debitis itaque sed aliquid tempore rerum sequi,
            ratione dolorum autem aspernatur? Esse voluptas cupiditate debitis
            dolor vitae eaque accusantium voluptate aliquid illum, laudantium,
            eius, nemo tenetur blanditiis dicta impedit quis exercitationem
            neque? Dolores modi neque nostrum dolore aliquid alias vero debitis
            doloremque fuga labore. Exercitationem totam vitae facilis ullam
            repudiandae optio nesciunt corporis suscipit libero laborum
            voluptatum quos quas sunt quisquam porro ab nostrum recusandae
            itaque, culpa accusamus voluptas illo aliquam ipsa sequi. Reiciendis
            nesciunt doloremque ut repellendus consequatur minima recusandae quo
            at cum dignissimos natus, iste quisquam quod vel eligendi repellat
            ea suscipit dicta facilis? Totam eum omnis fugit tempore fuga ullam
            et repellendus, quisquam, atque accusamus perferendis necessitatibus
            dolores, iure suscipit veritatis aut minima libero vitae doloremque
            voluptas sit maiores dignissimos nam. Quisquam expedita nisi
            incidunt quasi perspiciatis quam veniam nostrum dicta harum
            corrupti? Quia, suscipit debitis! Ab minima iste dolores omnis
            suscipit, cupiditate quas, laudantium, quisquam doloremque nesciunt
            porro similique ducimus nemo repellendus eius veniam accusamus
            commodi ex deleniti illo reiciendis atque necessitatibus iure?
            Voluptatum in at tempora, exercitationem maxime aliquid suscipit?
            Laborum dolores voluptatum temporibus similique debitis quam
            excepturi laudantium. Beatae, necessitatibus blanditiis! Eos debitis
            eveniet enim reiciendis optio! Temporibus est tenetur modi dolor
            perspiciatis exercitationem suscipit architecto neque. Quia, ipsa.
          </p>
        </div>
      </div>
    </div>
  );
}
