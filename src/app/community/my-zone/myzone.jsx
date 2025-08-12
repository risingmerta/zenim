"use client";
import React from "react";
import { FaBell, FaCog, FaHeart, FaHistory, FaUser } from "react-icons/fa";
import Link from "next/link";
import "./myzone.css";
import { useSession } from "next-auth/react";
import { FaSackDollar } from "react-icons/fa6";

export default function Zone(props) {
  const { data: session } = useSession();
  return (
    <div className="allpit">
      <img
        className="allpit-background"
        src={session?.user?.avatar}
        alt="pop"
      />
      {/* <img
        className="allpit-background-cover"
        src="https://t3.ftcdn.net/jpg/07/50/02/38/360_F_750023879_5zDv9jQtJexVt6MqCToarGwVkY9w3Jiq.jpg"
        alt=""
      /> */}
      <div className="hiik">Hi, {session?.user?.username}</div>
      <div className="linkok">
        <Link
          href={`/user/profile${
            props.refer ? `?refer=${props.refer}` : `?refer=weebsSecret`
          }`}
          className={`newPo ${props.slabId === "profile" ? "impot" : ""}`}
        >
          <div className="iconix">
            <FaUser />
          </div>
          <div className="namino">Profile</div>
        </Link>
        <Link
          href={`/user/continue-watching${
            props.refer ? `?refer=${props.refer}` : `?refer=weebsSecret`
          }`}
          className={`newPo ${
            props.slabId === "continue watching" ? "impot" : ""
          }`}
        >
          <div className="iconix">
            <FaHistory />
          </div>
          <div className="namino">Continue Watching</div>
        </Link>
        <Link
          href={`/user/watch-list${
            props.refer ? `?refer=${props.refer}` : `?refer=weebsSecret`
          }`}
          className={`newPo ${props.slabId === "watch list" ? "impot" : ""}`}
        >
          <div className="iconix">
            <FaHeart />
          </div>
          <div className="namino">Watch List</div>
        </Link>
        <Link
          href={`/user/notification${
            props.refer ? `?refer=${props.refer}` : `?refer=weebsSecret`
          }`}
          className={`newPo ${props.slabId === "notification" ? "impot" : ""}`}
        >
          <div className="iconix">
            <FaBell />
          </div>
          <div className="namino">Notification</div>
        </Link>
        <Link
          href={`/user/settings${
            props.refer ? `?refer=${props.refer}` : `?refer=weebsSecret`
          }`}
          className={`newPo ${props.slabId === "settings" ? "impot" : ""}`}
        >
          <div className="iconix">
            <FaCog />
          </div>
          <div className="namino">Settings</div>
        </Link>
        {/* <Link
          href={"/user/monetize"}
          className={`newPo ${props.slabId === "monetize" ? "impot" : ""}`}
        >
          <div className="iconix">
            <FaSackDollar />
          </div>
          <div className="namino">Monetize</div>
        </Link> */}
      </div>
      <div>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Consequuntur,
        nam maxime non neque, similique totam ipsam voluptas voluptatibus autem
        dolorum, velit impedit molestias porro tenetur. Suscipit expedita est
        ullam obcaecati eum illo praesentium deleniti nihil! Dolorem laboriosam
        pariatur ea officiis. Consequuntur praesentium, eum tempore maiores
        totam tenetur assumenda illum, voluptatum, at voluptas pariatur est
        dolor aperiam aspernatur ipsam molestiae tempora autem ipsum laboriosam
        dolorem sunt amet distinctio qui. Possimus tempora, nulla quaerat
        aperiam perferendis maiores saepe accusantium suscipit distinctio,
        obcaecati deleniti officia esse facere sed sapiente inventore ipsam
        odio, quas sequi laudantium aliquid? Unde magnam, aperiam nulla fuga
        aspernatur voluptate dignissimos dicta natus nam provident laboriosam
        deserunt corrupti doloremque dolor in minus voluptatibus itaque esse
        voluptas! Tempore, omnis quibusdam natus vero corrupti voluptatem
        accusantium amet facilis, aliquam animi veniam quis ut excepturi
        asperiores velit distinctio accusamus eveniet labore numquam nobis, a
        molestiae. Quibusdam inventore ea commodi reiciendis perspiciatis soluta
        laboriosam. Similique sed odit tempore facere distinctio sit maxime, a
        repellat! Nihil qui quaerat at sit assumenda temporibus iste doloremque
        adipisci molestias eius consequatur itaque animi vitae quam repudiandae
        provident velit praesentium, harum excepturi ipsam. Perferendis eligendi
        rem saepe recusandae eum impedit neque enim nihil quidem mollitia
        voluptates ut tenetur aliquam incidunt earum accusamus blanditiis omnis
        laborum, quia dolore a vel deleniti quis. Natus inventore nobis
        aspernatur modi aperiam sint corrupti rem officia sequi aut? Vel animi
        alias molestiae, repellendus officia ipsam non ducimus aut impedit harum
        quos provident ut officiis! Labore amet quia exercitationem animi.
        Quibusdam dolore quod quos aspernatur nisi est adipisci! Cumque ipsum
        nesciunt quia fuga. Amet magnam qui iure sed. Obcaecati similique nam
        beatae delectus sequi voluptatem iure cumque omnis aspernatur numquam
        praesentium laborum amet dolorum blanditiis dicta, perferendis iusto qui
        dolore fugiat temporibus accusantium incidunt consectetur! Repudiandae
        laboriosam minus atque, laudantium impedit voluptates sint, odit
        repellat voluptatem vitae cumque asperiores totam enim architecto beatae
        ratione. Nam, pariatur deserunt! Quo eaque recusandae excepturi corrupti
        cumque maxime molestiae, voluptatem deleniti magnam maiores odio non
        error odit facilis, ducimus voluptatibus laudantium. Cumque vero
        adipisci odit, commodi quod officiis. Ipsa cum dolor praesentium qui ad
        quia tenetur! Tempora veniam incidunt placeat molestiae iure dolore
        nesciunt reiciendis ab! Ab fuga id quisquam nobis recusandae ratione
        quidem veritatis cumque quod? Magni temporibus amet sapiente reiciendis
        optio esse at. Eligendi cupiditate libero quo vel, quas veritatis
        exercitationem impedit sunt aut dolorem temporibus illo eaque. Voluptate
        fugit unde vitae ducimus nostrum praesentium beatae iure veniam id quam
        nemo voluptas tempora ut iusto, dicta earum dolores illum esse minima
        ipsum eligendi? Pariatur exercitationem neque non quis error,
        voluptatibus rem quo eius harum voluptates cumque debitis est
        cupiditate, nisi veritatis consequatur cum asperiores sit at quidem
        similique ratione? Ipsum saepe assumenda, eaque fuga iusto harum sequi,
        reiciendis temporibus porro modi iste quisquam, dolorum aut qui
        exercitationem veniam provident ullam animi. Possimus quisquam quas
        error ratione et. Rem quae unde sit ad, quas saepe dolorem nostrum
        eligendi omnis nam accusamus? Nihil illo architecto temporibus magnam,
        aut, illum reiciendis explicabo omnis modi eos eum assumenda suscipit
        aperiam dignissimos inventore quae, fugiat obcaecati dolor. Incidunt
        architecto suscipit, rerum ea adipisci dolore optio non facilis facere
        molestias odit fugit quam quas inventore ex cumque eum quidem ratione
        mollitia atque dolor quisquam error exercitationem? Vitae deleniti sed
        repellendus incidunt quas placeat optio consequuntur laborum nemo
        maxime, cum quam tempora assumenda blanditiis, saepe ut. Est soluta
        velit enim voluptatibus aperiam dolor atque at necessitatibus expedita
        delectus iure, hic explicabo animi accusamus quo nobis, sapiente
        obcaecati deserunt eaque ullam rem. Similique amet alias in, nemo,
        necessitatibus dolore, tempora unde quasi quam sapiente molestias
        aspernatur! Mollitia sunt accusamus, earum corrupti doloremque fugiat
        quas nisi reprehenderit, aperiam quia nesciunt explicabo ex sequi
        veritatis modi! Ex sed nihil quidem modi quia, aspernatur ducimus ut!
        Necessitatibus est sed accusamus eius at autem animi ipsum aut quia,
        dolore nostrum commodi modi omnis facere obcaecati quam quo aperiam
        optio expedita rerum itaque aspernatur ad? Id praesentium necessitatibus
        deleniti, cum, animi, ullam nesciunt ipsa velit commodi quo voluptatem
        doloremque. Accusamus perferendis ducimus nisi quaerat illo ratione
        nihil ut nemo vitae recusandae asperiores quo similique impedit
        molestiae doloremque enim modi necessitatibus, blanditiis maiores optio
        quam aspernatur. Itaque tenetur fugiat maiores nesciunt possimus neque
        illo illum temporibus molestiae. Minus odit praesentium expedita
        voluptatem eius dolore soluta optio tempore debitis provident magnam
        facilis accusamus nihil adipisci beatae iure voluptate impedit, vel
        aspernatur sapiente. Laborum ullam recusandae harum eos laboriosam
        nostrum, sequi error veniam fugiat et aut. Quidem nisi, odit tempore
        asperiores necessitatibus inventore mollitia possimus optio enim minima
        minus quisquam dicta nobis, magnam porro aspernatur. Magnam placeat vel
        iste ipsa. Labore assumenda aspernatur aperiam similique ipsa, ea rem
        tenetur nihil voluptate minus recusandae odio accusamus beatae culpa
        consequatur! Modi sunt error vel odio quam similique consequatur aut,
        numquam debitis soluta a quidem nobis vitae quis hic laudantium ipsum
        tempora. Nam animi necessitatibus alias quidem asperiores, doloremque
        vero inventore eum tempora esse odio, nulla praesentium. Sequi
        consequuntur dolorum laboriosam voluptatem, voluptatibus sit nihil
        soluta. Magnam animi commodi amet deserunt fugiat mollitia quisquam sit.
        Ducimus eligendi reiciendis beatae accusamus nesciunt, placeat, nulla
        iusto repudiandae unde ratione quo. Debitis voluptatum ullam laborum,
        omnis maiores voluptate magnam, asperiores molestiae iusto sit, dicta et
        quia repellat quibusdam qui aut perspiciatis ut blanditiis labore
        laboriosam cum maxime totam id commodi. Praesentium aliquid eveniet
        deleniti incidunt. Itaque distinctio ipsa fuga obcaecati vel modi
        blanditiis voluptate, quos ad cum consectetur? Sapiente molestiae, dicta
        modi hic voluptate, non iure quo temporibus ratione in sunt repellat
        itaque? Sint, similique dignissimos delectus deserunt, a mollitia vitae
        fugiat iure, laboriosam aperiam architecto saepe dolor? Mollitia
        reiciendis eligendi ex minus eos. Laboriosam, quidem ipsa minus animi
        voluptates quod enim dolores quae dolorum consequuntur fuga culpa
        repellendus placeat? At mollitia blanditiis minus aut amet cum, quo
        incidunt eum expedita odit voluptate ducimus rem modi numquam placeat
        fugiat nobis eius corrupti quidem dicta. Nihil, nobis maiores temporibus
        pariatur accusantium inventore ducimus architecto sed tenetur magnam est
        laudantium quam illo qui ea esse eum in, sint possimus? Illum, libero
        laborum veniam ea earum ad voluptatum animi esse aspernatur ipsa?
      </div>
    </div>
  );
}
