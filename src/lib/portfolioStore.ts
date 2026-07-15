"use client";

export interface Photo {
  id: string;
  url: string;
  category: string; // 'Ceremony' | 'Portraits' | 'Bride Portraits' | 'Reception' | 'Candid Moments' | 'Details'
  likes?: number;
}

export interface ClientGallery {
  id: string;
  categoryId: string; // e.g. 'weddings'
  name: string;
  description: string;
  date: string;
  location: string;
  photographer: string;
  coverUrl?: string;
  photos: Photo[];
  isPublic: boolean;
  password?: string;
  favorites?: string[]; // list of photo IDs favorited by clients
  isFeatured?: boolean;
}

export interface Category {
  id: string;
  name: string;
  coverUrl: string;
  shootCount: number;
  order: number;
}

const DEFAULT_CATEGORIES: Category[] = [
  {
    id: "weddings",
    name: "Weddings",
    coverUrl: "https://res.cloudinary.com/eksh1jyi/image/upload/v1783934457/portfolio/file_x8hxas.jpg",
    shootCount: 5,
    order: 1,
  },
  {
    id: "pre-weddings",
    name: "Pre Weddings",
    coverUrl: "https://res.cloudinary.com/eksh1jyi/image/upload/v1783936606/portfolio/file_jbsytq.jpg",
    shootCount: 1,
    order: 2,
  },
  {
    id: "destination-weddings",
    name: "Destination Weddings",
    coverUrl: "https://res.cloudinary.com/eksh1jyi/image/upload/v1783937444/portfolio/file_vzn6it.jpg",
    shootCount: 1,
    order: 3,
  },
  {
    id: "portraits",
    name: "Fashion & Portraits",
    coverUrl: "https://res.cloudinary.com/eksh1jyi/image/upload/v1783937145/portfolio/file_kzkjio.jpg",
    shootCount: 1,
    order: 4,
  },
];


const DEFAULT_GALLERIES: ClientGallery[] = [
  {
    id: "wedding-collection-2024",
    categoryId: "weddings",
    name: "Wedding Collection 2024",
    description: "A stunning collection of real Indian weddings captured with elegance and emotion.",
    date: "2024-05-12",
    location: "India",
    photographer: "Om",
    coverUrl: "https://res.cloudinary.com/eksh1jyi/image/upload/v1783963348/portfolio/file_nnogt6.jpg",
    isPublic: true,
    favorites: [],
    isFeatured: true,
    photos: [
    { id: "cf0", url: "https://res.cloudinary.com/eksh1jyi/image/upload/v1783963348/portfolio/file_nnogt6.jpg", category: "Ceremony", likes: 10 },
    { id: "cf1", url: "https://res.cloudinary.com/eksh1jyi/image/upload/v1783963372/portfolio/file_d4ompj.jpg", category: "Couple Portraits", likes: 11 },
    { id: "cf2", url: "https://res.cloudinary.com/eksh1jyi/image/upload/v1783963389/portfolio/file_q2upes.jpg", category: "Bride Portraits", likes: 12 },
    { id: "cf3", url: "https://res.cloudinary.com/eksh1jyi/image/upload/v1783963399/portfolio/file_ed2nzk.jpg", category: "Candid Moments", likes: 13 },
    { id: "cf4", url: "https://res.cloudinary.com/eksh1jyi/image/upload/v1783963402/portfolio/file_hgsyeh.jpg", category: "Reception", likes: 14 },
    { id: "cf5", url: "https://res.cloudinary.com/eksh1jyi/image/upload/v1783963404/portfolio/file_jnlquj.jpg", category: "Details", likes: 15 },
    { id: "cf6", url: "https://res.cloudinary.com/eksh1jyi/image/upload/v1783963407/portfolio/file_fp05lf.jpg", category: "Ceremony", likes: 16 },
    { id: "cf7", url: "https://res.cloudinary.com/eksh1jyi/image/upload/v1783963409/portfolio/file_ehge3i.jpg", category: "Couple Portraits", likes: 17 },
    { id: "cf8", url: "https://res.cloudinary.com/eksh1jyi/image/upload/v1783963411/portfolio/file_nfbkfd.jpg", category: "Bride Portraits", likes: 18 },
    { id: "cf9", url: "https://res.cloudinary.com/eksh1jyi/image/upload/v1783963412/portfolio/file_e3ky7q.jpg", category: "Candid Moments", likes: 19 },
    { id: "cf10", url: "https://res.cloudinary.com/eksh1jyi/image/upload/v1783963414/portfolio/file_tocmhm.jpg", category: "Reception", likes: 20 },
    { id: "cf11", url: "https://res.cloudinary.com/eksh1jyi/image/upload/v1783963416/portfolio/file_tgnlcl.jpg", category: "Details", likes: 21 },
    { id: "cf12", url: "https://res.cloudinary.com/eksh1jyi/image/upload/v1783963418/portfolio/file_wzekeq.jpg", category: "Ceremony", likes: 22 },
    { id: "cf13", url: "https://res.cloudinary.com/eksh1jyi/image/upload/v1783963420/portfolio/file_n40hir.jpg", category: "Couple Portraits", likes: 23 },
    { id: "cf14", url: "https://res.cloudinary.com/eksh1jyi/image/upload/v1783963422/portfolio/file_gkaesl.jpg", category: "Bride Portraits", likes: 24 },
    { id: "cf15", url: "https://res.cloudinary.com/eksh1jyi/image/upload/v1783963424/portfolio/file_vbvm1v.jpg", category: "Candid Moments", likes: 25 },
    { id: "cf16", url: "https://res.cloudinary.com/eksh1jyi/image/upload/v1783963438/portfolio/file_ar0qzu.jpg", category: "Reception", likes: 26 },
    { id: "cf17", url: "https://res.cloudinary.com/eksh1jyi/image/upload/v1783963439/portfolio/file_q5mrf4.jpg", category: "Details", likes: 27 },
    { id: "cf18", url: "https://res.cloudinary.com/eksh1jyi/image/upload/v1783963441/portfolio/file_gku6i1.jpg", category: "Ceremony", likes: 28 },
    { id: "cf19", url: "https://res.cloudinary.com/eksh1jyi/image/upload/v1783963453/portfolio/file_hwa9dc.jpg", category: "Couple Portraits", likes: 29 },
    { id: "cf20", url: "https://res.cloudinary.com/eksh1jyi/image/upload/v1783963455/portfolio/file_hzmsim.jpg", category: "Bride Portraits", likes: 30 },
    { id: "cf21", url: "https://res.cloudinary.com/eksh1jyi/image/upload/v1783963460/portfolio/file_raldl4.jpg", category: "Candid Moments", likes: 31 },
    { id: "cf22", url: "https://res.cloudinary.com/eksh1jyi/image/upload/v1783963462/portfolio/file_t6va6o.jpg", category: "Reception", likes: 32 },
    { id: "cf23", url: "https://res.cloudinary.com/eksh1jyi/image/upload/v1783963476/portfolio/file_rjsxl0.jpg", category: "Details", likes: 33 },
    { id: "cf24", url: "https://res.cloudinary.com/eksh1jyi/image/upload/v1783963481/portfolio/file_jvg04g.jpg", category: "Ceremony", likes: 34 },
    { id: "cf25", url: "https://res.cloudinary.com/eksh1jyi/image/upload/v1783963483/portfolio/file_sah8xq.jpg", category: "Couple Portraits", likes: 35 },
    { id: "cf26", url: "https://res.cloudinary.com/eksh1jyi/image/upload/v1783963497/portfolio/file_vfd73b.jpg", category: "Bride Portraits", likes: 36 },
    { id: "cf27", url: "https://res.cloudinary.com/eksh1jyi/image/upload/v1783963504/portfolio/file_q0ujll.jpg", category: "Candid Moments", likes: 37 },
    { id: "cf28", url: "https://res.cloudinary.com/eksh1jyi/image/upload/v1783963508/portfolio/file_hajaoa.jpg", category: "Reception", likes: 38 },
    { id: "cf29", url: "https://res.cloudinary.com/eksh1jyi/image/upload/v1783963524/portfolio/file_nksnug.jpg", category: "Details", likes: 39 },
    { id: "cf30", url: "https://res.cloudinary.com/eksh1jyi/image/upload/v1783963529/portfolio/file_ltftav.jpg", category: "Ceremony", likes: 40 },
    { id: "cf31", url: "https://res.cloudinary.com/eksh1jyi/image/upload/v1783963534/portfolio/file_frfszu.jpg", category: "Couple Portraits", likes: 41 },
    { id: "cf32", url: "https://res.cloudinary.com/eksh1jyi/image/upload/v1783963549/portfolio/file_kdrjcv.jpg", category: "Bride Portraits", likes: 42 },
    { id: "cf33", url: "https://res.cloudinary.com/eksh1jyi/image/upload/v1783963563/portfolio/file_lbstat.jpg", category: "Candid Moments", likes: 43 },
    { id: "cf34", url: "https://res.cloudinary.com/eksh1jyi/image/upload/v1783963569/portfolio/file_ss3hz4.jpg", category: "Reception", likes: 44 },
    { id: "cf35", url: "https://res.cloudinary.com/eksh1jyi/image/upload/v1783963586/portfolio/file_a2xkjc.jpg", category: "Details", likes: 10 },
    { id: "cf36", url: "https://res.cloudinary.com/eksh1jyi/image/upload/v1783963588/portfolio/file_dex3bx.jpg", category: "Ceremony", likes: 11 },
    { id: "cf37", url: "https://res.cloudinary.com/eksh1jyi/image/upload/v1783963602/portfolio/file_mpcari.jpg", category: "Couple Portraits", likes: 12 },
    { id: "cf38", url: "https://res.cloudinary.com/eksh1jyi/image/upload/v1783963604/portfolio/file_dsrhjk.jpg", category: "Bride Portraits", likes: 13 },
    { id: "cf39", url: "https://res.cloudinary.com/eksh1jyi/image/upload/v1783963608/portfolio/file_kt9vn8.jpg", category: "Candid Moments", likes: 14 }
    ],
  },
  {
    id: "candid-moments",
    categoryId: "weddings",
    name: "Candid Moments",
    description: "Unscripted, heartfelt moments from our favourite weddings.",
    date: "2024-08-10",
    location: "India",
    photographer: "Om",
    coverUrl: "https://res.cloudinary.com/eksh1jyi/image/upload/v1783963613/portfolio/file_irrxtr.jpg",
    isPublic: true,
    favorites: [],
    isFeatured: false,
    photos: [
    { id: "cf40", url: "https://res.cloudinary.com/eksh1jyi/image/upload/v1783963613/portfolio/file_irrxtr.jpg", category: "Reception", likes: 15 },
    { id: "cf41", url: "https://res.cloudinary.com/eksh1jyi/image/upload/v1783963618/portfolio/file_lcewla.jpg", category: "Details", likes: 16 },
    { id: "cf42", url: "https://res.cloudinary.com/eksh1jyi/image/upload/v1783963623/portfolio/file_saytlo.jpg", category: "Ceremony", likes: 17 },
    { id: "cf43", url: "https://res.cloudinary.com/eksh1jyi/image/upload/v1783963626/portfolio/file_g0h5qg.jpg", category: "Couple Portraits", likes: 18 },
    { id: "cf44", url: "https://res.cloudinary.com/eksh1jyi/image/upload/v1783963642/portfolio/file_y3vzs9.jpg", category: "Bride Portraits", likes: 19 },
    { id: "cf45", url: "https://res.cloudinary.com/eksh1jyi/image/upload/v1783963657/portfolio/file_r2gmir.jpg", category: "Candid Moments", likes: 20 },
    { id: "cf46", url: "https://res.cloudinary.com/eksh1jyi/image/upload/v1783963670/portfolio/file_ifuyoy.jpg", category: "Reception", likes: 21 },
    { id: "cf47", url: "https://res.cloudinary.com/eksh1jyi/image/upload/v1783963674/portfolio/file_faqp4f.jpg", category: "Details", likes: 22 },
    { id: "cf48", url: "https://res.cloudinary.com/eksh1jyi/image/upload/v1783963680/portfolio/file_qjhmud.jpg", category: "Ceremony", likes: 23 },
    { id: "cf49", url: "https://res.cloudinary.com/eksh1jyi/image/upload/v1783963686/portfolio/file_szhrba.jpg", category: "Couple Portraits", likes: 24 },
    { id: "cf50", url: "https://res.cloudinary.com/eksh1jyi/image/upload/v1783963689/portfolio/file_oqpqn3.jpg", category: "Bride Portraits", likes: 25 },
    { id: "cf51", url: "https://res.cloudinary.com/eksh1jyi/image/upload/v1783963695/portfolio/file_lupqzu.jpg", category: "Candid Moments", likes: 26 },
    { id: "cf52", url: "https://res.cloudinary.com/eksh1jyi/image/upload/v1783963703/portfolio/file_ahmxfo.jpg", category: "Reception", likes: 27 },
    { id: "cf53", url: "https://res.cloudinary.com/eksh1jyi/image/upload/v1783963710/portfolio/file_pk777n.jpg", category: "Details", likes: 28 },
    { id: "cf54", url: "https://res.cloudinary.com/eksh1jyi/image/upload/v1783963714/portfolio/file_hbwaab.jpg", category: "Ceremony", likes: 29 },
    { id: "cf55", url: "https://res.cloudinary.com/eksh1jyi/image/upload/v1783963727/portfolio/file_tbp6dz.jpg", category: "Couple Portraits", likes: 30 },
    { id: "cf56", url: "https://res.cloudinary.com/eksh1jyi/image/upload/v1783963730/portfolio/file_eshasb.jpg", category: "Bride Portraits", likes: 31 },
    { id: "cf57", url: "https://res.cloudinary.com/eksh1jyi/image/upload/v1783963734/portfolio/file_drttld.jpg", category: "Candid Moments", likes: 32 },
    { id: "cf58", url: "https://res.cloudinary.com/eksh1jyi/image/upload/v1783963738/portfolio/file_a4qa5a.jpg", category: "Reception", likes: 33 },
    { id: "cf59", url: "https://res.cloudinary.com/eksh1jyi/image/upload/v1783963742/portfolio/file_lkbszg.jpg", category: "Details", likes: 34 },
    { id: "cf60", url: "https://res.cloudinary.com/eksh1jyi/image/upload/v1783963748/portfolio/file_kok9ay.jpg", category: "Ceremony", likes: 35 },
    { id: "cf61", url: "https://res.cloudinary.com/eksh1jyi/image/upload/v1783963752/portfolio/file_a8cphf.jpg", category: "Couple Portraits", likes: 36 },
    { id: "cf62", url: "https://res.cloudinary.com/eksh1jyi/image/upload/v1783963758/portfolio/file_edtkey.jpg", category: "Bride Portraits", likes: 37 },
    { id: "cf63", url: "https://res.cloudinary.com/eksh1jyi/image/upload/v1783963772/portfolio/file_q4osbv.jpg", category: "Candid Moments", likes: 38 },
    { id: "cf64", url: "https://res.cloudinary.com/eksh1jyi/image/upload/v1783963776/portfolio/file_ny70vl.jpg", category: "Reception", likes: 39 },
    { id: "cf65", url: "https://res.cloudinary.com/eksh1jyi/image/upload/v1783963783/portfolio/file_zquyps.jpg", category: "Details", likes: 40 },
    { id: "cf66", url: "https://res.cloudinary.com/eksh1jyi/image/upload/v1783963796/portfolio/file_gihyke.jpg", category: "Ceremony", likes: 41 },
    { id: "cf67", url: "https://res.cloudinary.com/eksh1jyi/image/upload/v1783963802/portfolio/file_oyhu10.jpg", category: "Couple Portraits", likes: 42 },
    { id: "cf68", url: "https://res.cloudinary.com/eksh1jyi/image/upload/v1783963808/portfolio/file_bw17hc.jpg", category: "Bride Portraits", likes: 43 },
    { id: "cf69", url: "https://res.cloudinary.com/eksh1jyi/image/upload/v1783963816/portfolio/file_xusvw0.jpg", category: "Candid Moments", likes: 44 },
    { id: "cf70", url: "https://res.cloudinary.com/eksh1jyi/image/upload/v1783963829/portfolio/file_zindwp.jpg", category: "Reception", likes: 10 },
    { id: "cf71", url: "https://res.cloudinary.com/eksh1jyi/image/upload/v1783963835/portfolio/file_uyo556.jpg", category: "Details", likes: 11 },
    { id: "cf72", url: "https://res.cloudinary.com/eksh1jyi/image/upload/v1783963840/portfolio/file_mksltc.jpg", category: "Ceremony", likes: 12 },
    { id: "cf73", url: "https://res.cloudinary.com/eksh1jyi/image/upload/v1783963845/portfolio/file_oqbrqc.jpg", category: "Couple Portraits", likes: 13 },
    { id: "cf74", url: "https://res.cloudinary.com/eksh1jyi/image/upload/v1783963848/portfolio/file_oz3ivs.jpg", category: "Bride Portraits", likes: 14 },
    { id: "cf75", url: "https://res.cloudinary.com/eksh1jyi/image/upload/v1783963853/portfolio/file_rw9yxs.jpg", category: "Candid Moments", likes: 15 },
    { id: "cf76", url: "https://res.cloudinary.com/eksh1jyi/image/upload/v1783963858/portfolio/file_ji0p7r.jpg", category: "Reception", likes: 16 },
    { id: "cf77", url: "https://res.cloudinary.com/eksh1jyi/image/upload/v1783963865/portfolio/file_hlj23s.jpg", category: "Details", likes: 17 },
    { id: "cf78", url: "https://res.cloudinary.com/eksh1jyi/image/upload/v1783963870/portfolio/file_roy22d.jpg", category: "Ceremony", likes: 18 },
    { id: "cf79", url: "https://res.cloudinary.com/eksh1jyi/image/upload/v1783963873/portfolio/file_o62wbq.jpg", category: "Couple Portraits", likes: 19 }
    ],
  },
  {
    id: "bridal-portraits",
    categoryId: "weddings",
    name: "Bridal Portraits",
    description: "Elegant bridal portraits that tell the story of every bride's special day.",
    date: "2024-11-18",
    location: "India",
    photographer: "Om",
    coverUrl: "https://res.cloudinary.com/eksh1jyi/image/upload/v1783963878/portfolio/file_hmtqkb.jpg",
    isPublic: true,
    favorites: [],
    isFeatured: false,
    photos: [
    { id: "cf80", url: "https://res.cloudinary.com/eksh1jyi/image/upload/v1783963878/portfolio/file_hmtqkb.jpg", category: "Bride Portraits", likes: 20 },
    { id: "cf81", url: "https://res.cloudinary.com/eksh1jyi/image/upload/v1783963892/portfolio/file_get15v.jpg", category: "Candid Moments", likes: 21 },
    { id: "cf82", url: "https://res.cloudinary.com/eksh1jyi/image/upload/v1783963898/portfolio/file_e1qbyk.jpg", category: "Reception", likes: 22 },
    { id: "cf83", url: "https://res.cloudinary.com/eksh1jyi/image/upload/v1783963904/portfolio/file_c983ef.jpg", category: "Details", likes: 23 },
    { id: "cf84", url: "https://res.cloudinary.com/eksh1jyi/image/upload/v1783963910/portfolio/file_k8j5my.jpg", category: "Ceremony", likes: 24 },
    { id: "cf85", url: "https://res.cloudinary.com/eksh1jyi/image/upload/v1783963917/portfolio/file_g8qhae.jpg", category: "Couple Portraits", likes: 25 },
    { id: "cf86", url: "https://res.cloudinary.com/eksh1jyi/image/upload/v1783963923/portfolio/file_sawley.jpg", category: "Bride Portraits", likes: 26 },
    { id: "cf87", url: "https://res.cloudinary.com/eksh1jyi/image/upload/v1783963936/portfolio/file_khgjh9.jpg", category: "Candid Moments", likes: 27 },
    { id: "cf88", url: "https://res.cloudinary.com/eksh1jyi/image/upload/v1783963951/portfolio/file_bmmxr2.jpg", category: "Reception", likes: 28 },
    { id: "cf89", url: "https://res.cloudinary.com/eksh1jyi/image/upload/v1783963964/portfolio/file_peyitn.jpg", category: "Details", likes: 29 },
    { id: "cf90", url: "https://res.cloudinary.com/eksh1jyi/image/upload/v1783963978/portfolio/file_vrgqto.jpg", category: "Ceremony", likes: 30 },
    { id: "cf91", url: "https://res.cloudinary.com/eksh1jyi/image/upload/v1783963984/portfolio/file_tbxyg8.jpg", category: "Couple Portraits", likes: 31 },
    { id: "cf92", url: "https://res.cloudinary.com/eksh1jyi/image/upload/v1783963999/portfolio/file_h3pxxj.jpg", category: "Bride Portraits", likes: 32 },
    { id: "cf93", url: "https://res.cloudinary.com/eksh1jyi/image/upload/v1783964004/portfolio/file_ikv5x3.jpg", category: "Candid Moments", likes: 33 },
    { id: "cf94", url: "https://res.cloudinary.com/eksh1jyi/image/upload/v1783964016/portfolio/file_nq1h3l.jpg", category: "Reception", likes: 34 },
    { id: "cf95", url: "https://res.cloudinary.com/eksh1jyi/image/upload/v1783964021/portfolio/file_imkvae.jpg", category: "Details", likes: 35 },
    { id: "cf96", url: "https://res.cloudinary.com/eksh1jyi/image/upload/v1783964027/portfolio/file_dmeyyz.jpg", category: "Ceremony", likes: 36 },
    { id: "cf97", url: "https://res.cloudinary.com/eksh1jyi/image/upload/v1783964030/portfolio/file_izmdq9.jpg", category: "Couple Portraits", likes: 37 },
    { id: "cf98", url: "https://res.cloudinary.com/eksh1jyi/image/upload/v1783964044/portfolio/file_hcktde.jpg", category: "Bride Portraits", likes: 38 },
    { id: "cf99", url: "https://res.cloudinary.com/eksh1jyi/image/upload/v1783964050/portfolio/file_xe7u2y.jpg", category: "Candid Moments", likes: 39 },
    { id: "cf100", url: "https://res.cloudinary.com/eksh1jyi/image/upload/v1783964066/portfolio/file_iwjecl.jpg", category: "Reception", likes: 40 },
    { id: "cf101", url: "https://res.cloudinary.com/eksh1jyi/image/upload/v1783964082/portfolio/file_hrpi8w.jpg", category: "Details", likes: 41 },
    { id: "cf102", url: "https://res.cloudinary.com/eksh1jyi/image/upload/v1783964101/portfolio/file_wbmbaj.jpg", category: "Ceremony", likes: 42 },
    { id: "cf103", url: "https://res.cloudinary.com/eksh1jyi/image/upload/v1783964119/portfolio/file_tdsx5r.jpg", category: "Couple Portraits", likes: 43 },
    { id: "cf104", url: "https://res.cloudinary.com/eksh1jyi/image/upload/v1783964138/portfolio/file_pwywv2.jpg", category: "Bride Portraits", likes: 44 },
    { id: "cf105", url: "https://res.cloudinary.com/eksh1jyi/image/upload/v1783964156/portfolio/file_is4zof.jpg", category: "Candid Moments", likes: 10 },
    { id: "cf106", url: "https://res.cloudinary.com/eksh1jyi/image/upload/v1783964173/portfolio/file_iawxw3.jpg", category: "Reception", likes: 11 },
    { id: "cf107", url: "https://res.cloudinary.com/eksh1jyi/image/upload/v1783964187/portfolio/file_h2qsyd.jpg", category: "Details", likes: 12 },
    { id: "cf108", url: "https://res.cloudinary.com/eksh1jyi/image/upload/v1783964195/portfolio/file_xpenze.jpg", category: "Ceremony", likes: 13 },
    { id: "cf109", url: "https://res.cloudinary.com/eksh1jyi/image/upload/v1783964212/portfolio/file_kosg4q.jpg", category: "Couple Portraits", likes: 14 },
    { id: "cf110", url: "https://res.cloudinary.com/eksh1jyi/image/upload/v1783964219/portfolio/file_fbdshr.jpg", category: "Bride Portraits", likes: 15 },
    { id: "cf111", url: "https://res.cloudinary.com/eksh1jyi/image/upload/v1783964232/portfolio/file_nwypud.jpg", category: "Candid Moments", likes: 16 },
    { id: "cf112", url: "https://res.cloudinary.com/eksh1jyi/image/upload/v1783964245/portfolio/file_mo67o4.jpg", category: "Reception", likes: 17 },
    { id: "cf113", url: "https://res.cloudinary.com/eksh1jyi/image/upload/v1783964250/portfolio/file_huv5t5.jpg", category: "Details", likes: 18 },
    { id: "cf114", url: "https://res.cloudinary.com/eksh1jyi/image/upload/v1783964265/portfolio/file_tr3i2z.jpg", category: "Ceremony", likes: 19 },
    { id: "cf115", url: "https://res.cloudinary.com/eksh1jyi/image/upload/v1783964281/portfolio/file_fq68op.jpg", category: "Couple Portraits", likes: 20 },
    { id: "cf116", url: "https://res.cloudinary.com/eksh1jyi/image/upload/v1783964300/portfolio/file_dy9mud.jpg", category: "Bride Portraits", likes: 21 },
    { id: "cf117", url: "https://res.cloudinary.com/eksh1jyi/image/upload/v1783964305/portfolio/file_me9kyx.jpg", category: "Candid Moments", likes: 22 },
    { id: "cf118", url: "https://res.cloudinary.com/eksh1jyi/image/upload/v1783964309/portfolio/file_hntg6m.jpg", category: "Reception", likes: 23 },
    { id: "cf119", url: "https://res.cloudinary.com/eksh1jyi/image/upload/v1783964317/portfolio/file_arckm3.jpg", category: "Details", likes: 24 }
    ],
  },
  {
    id: "royal-ceremonies",
    categoryId: "weddings",
    name: "Royal Ceremonies",
    description: "Grand ceremonies brimming with tradition, colour and joy.",
    date: "2024-12-05",
    location: "Rajasthan, India",
    photographer: "Om",
    coverUrl: "https://res.cloudinary.com/eksh1jyi/image/upload/v1783964321/portfolio/file_sbsrgk.jpg",
    isPublic: true,
    favorites: [],
    isFeatured: false,
    photos: [
    { id: "cf120", url: "https://res.cloudinary.com/eksh1jyi/image/upload/v1783964321/portfolio/file_sbsrgk.jpg", category: "Ceremony", likes: 25 },
    { id: "cf121", url: "https://res.cloudinary.com/eksh1jyi/image/upload/v1783964325/portfolio/file_phvl1b.jpg", category: "Couple Portraits", likes: 26 },
    { id: "cf122", url: "https://res.cloudinary.com/eksh1jyi/image/upload/v1783964329/portfolio/file_ic8qti.jpg", category: "Bride Portraits", likes: 27 },
    { id: "cf123", url: "https://res.cloudinary.com/eksh1jyi/image/upload/v1783964333/portfolio/file_snvkr0.jpg", category: "Candid Moments", likes: 28 },
    { id: "cf124", url: "https://res.cloudinary.com/eksh1jyi/image/upload/v1783964337/portfolio/file_uqktte.jpg", category: "Reception", likes: 29 },
    { id: "cf125", url: "https://res.cloudinary.com/eksh1jyi/image/upload/v1783964340/portfolio/file_nyzhng.jpg", category: "Details", likes: 30 },
    { id: "cf126", url: "https://res.cloudinary.com/eksh1jyi/image/upload/v1783964346/portfolio/file_mktdh4.jpg", category: "Ceremony", likes: 31 },
    { id: "cf127", url: "https://res.cloudinary.com/eksh1jyi/image/upload/v1783964350/portfolio/file_ki7lwm.jpg", category: "Couple Portraits", likes: 32 },
    { id: "cf128", url: "https://res.cloudinary.com/eksh1jyi/image/upload/v1783964355/portfolio/file_iyu0xf.jpg", category: "Bride Portraits", likes: 33 },
    { id: "cf129", url: "https://res.cloudinary.com/eksh1jyi/image/upload/v1783964360/portfolio/file_hwbiqr.jpg", category: "Candid Moments", likes: 34 },
    { id: "cf130", url: "https://res.cloudinary.com/eksh1jyi/image/upload/v1783964376/portfolio/file_xnrbhp.jpg", category: "Reception", likes: 35 },
    { id: "cf131", url: "https://res.cloudinary.com/eksh1jyi/image/upload/v1783964382/portfolio/file_kfyn7f.jpg", category: "Details", likes: 36 },
    { id: "cf132", url: "https://res.cloudinary.com/eksh1jyi/image/upload/v1783964387/portfolio/file_erkixg.jpg", category: "Ceremony", likes: 37 },
    { id: "cf133", url: "https://res.cloudinary.com/eksh1jyi/image/upload/v1783964394/portfolio/file_aj9kfe.jpg", category: "Couple Portraits", likes: 38 },
    { id: "cf134", url: "https://res.cloudinary.com/eksh1jyi/image/upload/v1783964408/portfolio/file_newm5l.jpg", category: "Bride Portraits", likes: 39 },
    { id: "cf135", url: "https://res.cloudinary.com/eksh1jyi/image/upload/v1783964414/portfolio/file_wmdujr.jpg", category: "Candid Moments", likes: 40 },
    { id: "cf136", url: "https://res.cloudinary.com/eksh1jyi/image/upload/v1783964428/portfolio/file_x7r0xi.jpg", category: "Reception", likes: 41 },
    { id: "cf137", url: "https://res.cloudinary.com/eksh1jyi/image/upload/v1783964434/portfolio/file_ignul0.jpg", category: "Details", likes: 42 },
    { id: "cf138", url: "https://res.cloudinary.com/eksh1jyi/image/upload/v1783964439/portfolio/file_c8jt7e.jpg", category: "Ceremony", likes: 43 },
    { id: "cf139", url: "https://res.cloudinary.com/eksh1jyi/image/upload/v1783964443/portfolio/file_egjzre.jpg", category: "Couple Portraits", likes: 44 },
    { id: "cf140", url: "https://res.cloudinary.com/eksh1jyi/image/upload/v1783964448/portfolio/file_e2rlcg.jpg", category: "Bride Portraits", likes: 10 },
    { id: "cf141", url: "https://res.cloudinary.com/eksh1jyi/image/upload/v1783964451/portfolio/file_mxzyzv.jpg", category: "Candid Moments", likes: 11 },
    { id: "cf142", url: "https://res.cloudinary.com/eksh1jyi/image/upload/v1783964456/portfolio/file_edfrnw.jpg", category: "Reception", likes: 12 },
    { id: "cf143", url: "https://res.cloudinary.com/eksh1jyi/image/upload/v1783964461/portfolio/file_udzhvx.jpg", category: "Details", likes: 13 },
    { id: "cf144", url: "https://res.cloudinary.com/eksh1jyi/image/upload/v1783964468/portfolio/file_bchyhv.jpg", category: "Ceremony", likes: 14 },
    { id: "cf145", url: "https://res.cloudinary.com/eksh1jyi/image/upload/v1783964474/portfolio/file_f8ylyh.jpg", category: "Couple Portraits", likes: 15 },
    { id: "cf146", url: "https://res.cloudinary.com/eksh1jyi/image/upload/v1783964480/portfolio/file_io5fkq.jpg", category: "Bride Portraits", likes: 16 },
    { id: "cf147", url: "https://res.cloudinary.com/eksh1jyi/image/upload/v1783964487/portfolio/file_krzkjn.jpg", category: "Candid Moments", likes: 17 },
    { id: "cf148", url: "https://res.cloudinary.com/eksh1jyi/image/upload/v1783964494/portfolio/file_ttfpif.jpg", category: "Reception", likes: 18 },
    { id: "cf149", url: "https://res.cloudinary.com/eksh1jyi/image/upload/v1783964499/portfolio/file_zxcryd.jpg", category: "Details", likes: 19 },
    { id: "cf150", url: "https://res.cloudinary.com/eksh1jyi/image/upload/v1783964504/portfolio/file_gxzeij.jpg", category: "Ceremony", likes: 20 },
    { id: "cf151", url: "https://res.cloudinary.com/eksh1jyi/image/upload/v1783964510/portfolio/file_qnqcvy.jpg", category: "Couple Portraits", likes: 21 },
    { id: "cf152", url: "https://res.cloudinary.com/eksh1jyi/image/upload/v1783964527/portfolio/file_hsnzbl.jpg", category: "Bride Portraits", likes: 22 },
    { id: "cf153", url: "https://res.cloudinary.com/eksh1jyi/image/upload/v1783964532/portfolio/file_efspu6.jpg", category: "Candid Moments", likes: 23 },
    { id: "cf154", url: "https://res.cloudinary.com/eksh1jyi/image/upload/v1783964537/portfolio/file_tkg4y1.jpg", category: "Reception", likes: 24 },
    { id: "cf155", url: "https://res.cloudinary.com/eksh1jyi/image/upload/v1783964542/portfolio/file_rjkzrr.jpg", category: "Details", likes: 25 },
    { id: "cf156", url: "https://res.cloudinary.com/eksh1jyi/image/upload/v1783964547/portfolio/file_qbrhnb.jpg", category: "Ceremony", likes: 26 },
    { id: "cf157", url: "https://res.cloudinary.com/eksh1jyi/image/upload/v1783964552/portfolio/file_uk2bad.jpg", category: "Couple Portraits", likes: 27 },
    { id: "cf158", url: "https://res.cloudinary.com/eksh1jyi/image/upload/v1783964556/portfolio/file_rayhyx.jpg", category: "Bride Portraits", likes: 28 },
    { id: "cf159", url: "https://res.cloudinary.com/eksh1jyi/image/upload/v1783964561/portfolio/file_xf2c65.jpg", category: "Candid Moments", likes: 29 }
    ],
  },
  {
    id: "intimate-receptions",
    categoryId: "weddings",
    name: "Intimate Receptions",
    description: "Warm, golden-hour reception memories for the ages.",
    date: "2025-01-15",
    location: "India",
    photographer: "Om",
    coverUrl: "https://res.cloudinary.com/eksh1jyi/image/upload/v1783964565/portfolio/file_vltv71.jpg",
    isPublic: true,
    favorites: [],
    isFeatured: false,
    photos: [
    { id: "cf160", url: "https://res.cloudinary.com/eksh1jyi/image/upload/v1783964565/portfolio/file_vltv71.jpg", category: "Reception", likes: 30 },
    { id: "cf161", url: "https://res.cloudinary.com/eksh1jyi/image/upload/v1783964570/portfolio/file_a1wirh.jpg", category: "Details", likes: 31 },
    { id: "cf162", url: "https://res.cloudinary.com/eksh1jyi/image/upload/v1783964576/portfolio/file_q76ybk.jpg", category: "Ceremony", likes: 32 },
    { id: "cf163", url: "https://res.cloudinary.com/eksh1jyi/image/upload/v1783964580/portfolio/file_wkdtlu.jpg", category: "Couple Portraits", likes: 33 },
    { id: "cf164", url: "https://res.cloudinary.com/eksh1jyi/image/upload/v1783964585/portfolio/file_cx1kb4.jpg", category: "Bride Portraits", likes: 34 },
    { id: "cf165", url: "https://res.cloudinary.com/eksh1jyi/image/upload/v1783964589/portfolio/file_fjvcdx.jpg", category: "Candid Moments", likes: 35 },
    { id: "cf166", url: "https://res.cloudinary.com/eksh1jyi/image/upload/v1783964593/portfolio/file_rb3ego.jpg", category: "Reception", likes: 36 },
    { id: "cf167", url: "https://res.cloudinary.com/eksh1jyi/image/upload/v1783964597/portfolio/file_hud2wf.jpg", category: "Details", likes: 37 },
    { id: "cf168", url: "https://res.cloudinary.com/eksh1jyi/image/upload/v1783964601/portfolio/file_mlul7m.jpg", category: "Ceremony", likes: 38 },
    { id: "cf169", url: "https://res.cloudinary.com/eksh1jyi/image/upload/v1783964606/portfolio/file_u9yrsy.jpg", category: "Couple Portraits", likes: 39 },
    { id: "cf170", url: "https://res.cloudinary.com/eksh1jyi/image/upload/v1783964609/portfolio/file_pico3s.jpg", category: "Bride Portraits", likes: 40 },
    { id: "cf171", url: "https://res.cloudinary.com/eksh1jyi/image/upload/v1783964614/portfolio/file_ejg3xu.jpg", category: "Candid Moments", likes: 41 },
    { id: "cf172", url: "https://res.cloudinary.com/eksh1jyi/image/upload/v1783964620/portfolio/file_gbvtrk.jpg", category: "Reception", likes: 42 },
    { id: "cf173", url: "https://res.cloudinary.com/eksh1jyi/image/upload/v1783964622/portfolio/file_losydh.jpg", category: "Details", likes: 43 },
    { id: "cf174", url: "https://res.cloudinary.com/eksh1jyi/image/upload/v1783964626/portfolio/file_sf46co.jpg", category: "Ceremony", likes: 44 },
    { id: "cf175", url: "https://res.cloudinary.com/eksh1jyi/image/upload/v1783964631/portfolio/file_mgfuwn.jpg", category: "Couple Portraits", likes: 10 },
    { id: "cf176", url: "https://res.cloudinary.com/eksh1jyi/image/upload/v1783964636/portfolio/file_kunvmf.jpg", category: "Bride Portraits", likes: 11 },
    { id: "cf177", url: "https://res.cloudinary.com/eksh1jyi/image/upload/v1783964642/portfolio/file_x5ptgu.jpg", category: "Candid Moments", likes: 12 },
    { id: "cf178", url: "https://res.cloudinary.com/eksh1jyi/image/upload/v1783964647/portfolio/file_sidy4o.jpg", category: "Reception", likes: 13 },
    { id: "cf179", url: "https://res.cloudinary.com/eksh1jyi/image/upload/v1783964652/portfolio/file_pygly4.jpg", category: "Details", likes: 14 },
    { id: "cf180", url: "https://res.cloudinary.com/eksh1jyi/image/upload/v1783964658/portfolio/file_bn5abe.jpg", category: "Ceremony", likes: 15 },
    { id: "cf181", url: "https://res.cloudinary.com/eksh1jyi/image/upload/v1783964663/portfolio/file_qgahsn.jpg", category: "Couple Portraits", likes: 16 },
    { id: "cf182", url: "https://res.cloudinary.com/eksh1jyi/image/upload/v1783964667/portfolio/file_rjoriz.jpg", category: "Bride Portraits", likes: 17 },
    { id: "cf183", url: "https://res.cloudinary.com/eksh1jyi/image/upload/v1783964673/portfolio/file_zsrdbr.jpg", category: "Candid Moments", likes: 18 },
    { id: "cf184", url: "https://res.cloudinary.com/eksh1jyi/image/upload/v1783964679/portfolio/file_wfmd9j.jpg", category: "Reception", likes: 19 },
    { id: "cf185", url: "https://res.cloudinary.com/eksh1jyi/image/upload/v1783964684/portfolio/file_a3avxj.jpg", category: "Details", likes: 20 },
    { id: "cf186", url: "https://res.cloudinary.com/eksh1jyi/image/upload/v1783964688/portfolio/file_ixrkfr.jpg", category: "Ceremony", likes: 21 },
    { id: "cf187", url: "https://res.cloudinary.com/eksh1jyi/image/upload/v1783964693/portfolio/file_yveouc.jpg", category: "Couple Portraits", likes: 22 },
    { id: "cf188", url: "https://res.cloudinary.com/eksh1jyi/image/upload/v1783964699/portfolio/file_ov2grm.jpg", category: "Bride Portraits", likes: 23 },
    { id: "cf189", url: "https://res.cloudinary.com/eksh1jyi/image/upload/v1783964716/portfolio/file_ht8fvy.jpg", category: "Candid Moments", likes: 24 },
    { id: "cf190", url: "https://res.cloudinary.com/eksh1jyi/image/upload/v1783964721/portfolio/file_wcmzu1.jpg", category: "Reception", likes: 25 },
    { id: "cf191", url: "https://res.cloudinary.com/eksh1jyi/image/upload/v1783964725/portfolio/file_pcdyqx.jpg", category: "Details", likes: 26 },
    { id: "cf192", url: "https://res.cloudinary.com/eksh1jyi/image/upload/v1783964729/portfolio/file_von4dt.jpg", category: "Ceremony", likes: 27 },
    { id: "cf193", url: "https://res.cloudinary.com/eksh1jyi/image/upload/v1783964743/portfolio/file_ocujyq.jpg", category: "Couple Portraits", likes: 28 },
    { id: "cf194", url: "https://res.cloudinary.com/eksh1jyi/image/upload/v1783964749/portfolio/file_pddnyx.jpg", category: "Bride Portraits", likes: 29 },
    { id: "cf195", url: "https://res.cloudinary.com/eksh1jyi/image/upload/v1783964752/portfolio/file_gbs3ca.jpg", category: "Candid Moments", likes: 30 },
    { id: "cf196", url: "https://res.cloudinary.com/eksh1jyi/image/upload/v1783964757/portfolio/file_eqd8ni.jpg", category: "Reception", likes: 31 },
    { id: "cf197", url: "https://res.cloudinary.com/eksh1jyi/image/upload/v1783964763/portfolio/file_ctd3hv.jpg", category: "Details", likes: 32 },
    { id: "cf198", url: "https://res.cloudinary.com/eksh1jyi/image/upload/v1783964766/portfolio/file_d45r18.jpg", category: "Ceremony", likes: 33 },
    { id: "cf199", url: "https://res.cloudinary.com/eksh1jyi/image/upload/v1783964769/portfolio/file_fehfox.jpg", category: "Couple Portraits", likes: 34 }
    ],
  },
  {
    id: "pre-wedding-stories",
    categoryId: "pre-weddings",
    name: "Pre-Wedding Stories",
    description: "Beautiful pre-wedding sessions set in stunning locations.",
    date: "2025-02-14",
    location: "India",
    photographer: "Om",
    coverUrl: "https://res.cloudinary.com/eksh1jyi/image/upload/v1783964790/portfolio/file_hl3xit.jpg",
    isPublic: true,
    favorites: [],
    isFeatured: false,
    photos: [
    { id: "cf200", url: "https://res.cloudinary.com/eksh1jyi/image/upload/v1783964790/portfolio/file_hl3xit.jpg", category: "Bride Portraits", likes: 35 },
    { id: "cf201", url: "https://res.cloudinary.com/eksh1jyi/image/upload/v1783964792/portfolio/file_gx6i9a.jpg", category: "Candid Moments", likes: 36 },
    { id: "cf202", url: "https://res.cloudinary.com/eksh1jyi/image/upload/v1783964796/portfolio/file_eyoiwf.jpg", category: "Reception", likes: 37 },
    { id: "cf203", url: "https://res.cloudinary.com/eksh1jyi/image/upload/v1783964799/portfolio/file_mpiojx.jpg", category: "Details", likes: 38 },
    { id: "cf204", url: "https://res.cloudinary.com/eksh1jyi/image/upload/v1783964804/portfolio/file_thqfyg.jpg", category: "Ceremony", likes: 39 },
    { id: "cf205", url: "https://res.cloudinary.com/eksh1jyi/image/upload/v1783964811/portfolio/file_yoyz7w.jpg", category: "Couple Portraits", likes: 40 },
    { id: "cf206", url: "https://res.cloudinary.com/eksh1jyi/image/upload/v1783964817/portfolio/file_fgo6hu.jpg", category: "Bride Portraits", likes: 41 },
    { id: "cf207", url: "https://res.cloudinary.com/eksh1jyi/image/upload/v1783964822/portfolio/file_sg7euh.jpg", category: "Candid Moments", likes: 42 },
    { id: "cf208", url: "https://res.cloudinary.com/eksh1jyi/image/upload/v1783964835/portfolio/file_ah6ivt.jpg", category: "Reception", likes: 43 },
    { id: "cf209", url: "https://res.cloudinary.com/eksh1jyi/image/upload/v1783964836/portfolio/file_xowmaz.jpg", category: "Details", likes: 44 },
    { id: "cf210", url: "https://res.cloudinary.com/eksh1jyi/image/upload/v1783964839/portfolio/file_ues1yp.jpg", category: "Ceremony", likes: 10 },
    { id: "cf211", url: "https://res.cloudinary.com/eksh1jyi/image/upload/v1783964845/portfolio/file_nvvybd.jpg", category: "Couple Portraits", likes: 11 },
    { id: "cf212", url: "https://res.cloudinary.com/eksh1jyi/image/upload/v1783964850/portfolio/file_dfmuvg.jpg", category: "Bride Portraits", likes: 12 },
    { id: "cf213", url: "https://res.cloudinary.com/eksh1jyi/image/upload/v1783964853/portfolio/file_lylhlj.jpg", category: "Candid Moments", likes: 13 },
    { id: "cf214", url: "https://res.cloudinary.com/eksh1jyi/image/upload/v1783964858/portfolio/file_e16ufi.jpg", category: "Reception", likes: 14 },
    { id: "cf215", url: "https://res.cloudinary.com/eksh1jyi/image/upload/v1783964863/portfolio/file_uqovif.jpg", category: "Details", likes: 15 },
    { id: "cf216", url: "https://res.cloudinary.com/eksh1jyi/image/upload/v1783964869/portfolio/file_qyncr1.jpg", category: "Ceremony", likes: 16 },
    { id: "cf217", url: "https://res.cloudinary.com/eksh1jyi/image/upload/v1783964871/portfolio/file_s5sxvy.jpg", category: "Couple Portraits", likes: 17 },
    { id: "cf218", url: "https://res.cloudinary.com/eksh1jyi/image/upload/v1783964874/portfolio/file_chz8qk.jpg", category: "Bride Portraits", likes: 18 },
    { id: "cf219", url: "https://res.cloudinary.com/eksh1jyi/image/upload/v1783964877/portfolio/file_qzqn7q.jpg", category: "Candid Moments", likes: 19 },
    { id: "cf220", url: "https://res.cloudinary.com/eksh1jyi/image/upload/v1783964882/portfolio/file_b11uuu.jpg", category: "Reception", likes: 20 },
    { id: "cf221", url: "https://res.cloudinary.com/eksh1jyi/image/upload/v1783964888/portfolio/file_efvsvj.jpg", category: "Details", likes: 21 },
    { id: "cf222", url: "https://res.cloudinary.com/eksh1jyi/image/upload/v1783964893/portfolio/file_v7nmrm.jpg", category: "Ceremony", likes: 22 },
    { id: "cf223", url: "https://res.cloudinary.com/eksh1jyi/image/upload/v1783964898/portfolio/file_ystpkw.jpg", category: "Couple Portraits", likes: 23 },
    { id: "cf224", url: "https://res.cloudinary.com/eksh1jyi/image/upload/v1783964902/portfolio/file_xx24wb.jpg", category: "Bride Portraits", likes: 24 },
    { id: "cf225", url: "https://res.cloudinary.com/eksh1jyi/image/upload/v1783964905/portfolio/file_wkwznt.jpg", category: "Candid Moments", likes: 25 },
    { id: "cf226", url: "https://res.cloudinary.com/eksh1jyi/image/upload/v1783964910/portfolio/file_liajvd.jpg", category: "Reception", likes: 26 },
    { id: "cf227", url: "https://res.cloudinary.com/eksh1jyi/image/upload/v1783964915/portfolio/file_zasveq.jpg", category: "Details", likes: 27 },
    { id: "cf228", url: "https://res.cloudinary.com/eksh1jyi/image/upload/v1783964920/portfolio/file_akjumn.jpg", category: "Ceremony", likes: 28 },
    { id: "cf229", url: "https://res.cloudinary.com/eksh1jyi/image/upload/v1783964924/portfolio/file_oay2js.jpg", category: "Couple Portraits", likes: 29 },
    { id: "cf230", url: "https://res.cloudinary.com/eksh1jyi/image/upload/v1783964929/portfolio/file_cmixwc.jpg", category: "Bride Portraits", likes: 30 },
    { id: "cf231", url: "https://res.cloudinary.com/eksh1jyi/image/upload/v1783964934/portfolio/file_facc2m.jpg", category: "Candid Moments", likes: 31 },
    { id: "cf232", url: "https://res.cloudinary.com/eksh1jyi/image/upload/v1783964940/portfolio/file_iddzr7.jpg", category: "Reception", likes: 32 },
    { id: "cf233", url: "https://res.cloudinary.com/eksh1jyi/image/upload/v1783964945/portfolio/file_k1dbev.jpg", category: "Details", likes: 33 },
    { id: "cf234", url: "https://res.cloudinary.com/eksh1jyi/image/upload/v1783964950/portfolio/file_moy5gd.jpg", category: "Ceremony", likes: 34 },
    { id: "cf235", url: "https://res.cloudinary.com/eksh1jyi/image/upload/v1783964955/portfolio/file_f6q374.jpg", category: "Couple Portraits", likes: 35 },
    { id: "cf236", url: "https://res.cloudinary.com/eksh1jyi/image/upload/v1783964957/portfolio/file_i3gouy.jpg", category: "Bride Portraits", likes: 36 },
    { id: "cf237", url: "https://res.cloudinary.com/eksh1jyi/image/upload/v1783964961/portfolio/file_oj7xi3.jpg", category: "Candid Moments", likes: 37 },
    { id: "cf238", url: "https://res.cloudinary.com/eksh1jyi/image/upload/v1783964965/portfolio/file_m1n2f0.jpg", category: "Reception", likes: 38 },
    { id: "cf239", url: "https://res.cloudinary.com/eksh1jyi/image/upload/v1783964969/portfolio/file_ahxa8g.jpg", category: "Details", likes: 39 }
    ],
  },
  {
    id: "fashion-portraits",
    categoryId: "portraits",
    name: "Fashion & Portraits",
    description: "Creative editorial and fashion portrait sessions.",
    date: "2025-03-01",
    location: "India",
    photographer: "Om",
    coverUrl: "https://res.cloudinary.com/eksh1jyi/image/upload/v1783964973/portfolio/file_cip6xx.jpg",
    isPublic: true,
    favorites: [],
    isFeatured: false,
    photos: [
    { id: "cf240", url: "https://res.cloudinary.com/eksh1jyi/image/upload/v1783964973/portfolio/file_cip6xx.jpg", category: "Ceremony", likes: 40 },
    { id: "cf241", url: "https://res.cloudinary.com/eksh1jyi/image/upload/v1783964977/portfolio/file_ipydwt.jpg", category: "Couple Portraits", likes: 41 },
    { id: "cf242", url: "https://res.cloudinary.com/eksh1jyi/image/upload/v1783964982/portfolio/file_kq2zhw.jpg", category: "Bride Portraits", likes: 42 },
    { id: "cf243", url: "https://res.cloudinary.com/eksh1jyi/image/upload/v1783964987/portfolio/file_spmuxg.jpg", category: "Candid Moments", likes: 43 },
    { id: "cf244", url: "https://res.cloudinary.com/eksh1jyi/image/upload/v1783964991/portfolio/file_g37mz2.jpg", category: "Reception", likes: 44 },
    { id: "cf245", url: "https://res.cloudinary.com/eksh1jyi/image/upload/v1783964998/portfolio/file_ukwgkv.jpg", category: "Details", likes: 10 },
    { id: "cf246", url: "https://res.cloudinary.com/eksh1jyi/image/upload/v1783965003/portfolio/file_jgcknq.jpg", category: "Ceremony", likes: 11 },
    { id: "cf247", url: "https://res.cloudinary.com/eksh1jyi/image/upload/v1783965007/portfolio/file_tmfnfy.jpg", category: "Couple Portraits", likes: 12 },
    { id: "cf248", url: "https://res.cloudinary.com/eksh1jyi/image/upload/v1783965011/portfolio/file_d06nky.jpg", category: "Bride Portraits", likes: 13 },
    { id: "cf249", url: "https://res.cloudinary.com/eksh1jyi/image/upload/v1783965016/portfolio/file_mxx8ms.jpg", category: "Candid Moments", likes: 14 },
    { id: "cf250", url: "https://res.cloudinary.com/eksh1jyi/image/upload/v1783965021/portfolio/file_fcvpf4.jpg", category: "Reception", likes: 15 },
    { id: "cf251", url: "https://res.cloudinary.com/eksh1jyi/image/upload/v1783965026/portfolio/file_un4szl.jpg", category: "Details", likes: 16 },
    { id: "cf252", url: "https://res.cloudinary.com/eksh1jyi/image/upload/v1783965031/portfolio/file_aeg8vd.jpg", category: "Ceremony", likes: 17 },
    { id: "cf253", url: "https://res.cloudinary.com/eksh1jyi/image/upload/v1783965033/portfolio/file_bhmbwv.jpg", category: "Couple Portraits", likes: 18 },
    { id: "cf254", url: "https://res.cloudinary.com/eksh1jyi/image/upload/v1783965036/portfolio/file_pdcnhh.jpg", category: "Bride Portraits", likes: 19 },
    { id: "cf255", url: "https://res.cloudinary.com/eksh1jyi/image/upload/v1783965039/portfolio/file_sfokwy.jpg", category: "Candid Moments", likes: 20 },
    { id: "cf256", url: "https://res.cloudinary.com/eksh1jyi/image/upload/v1783965043/portfolio/file_mzt3uj.jpg", category: "Reception", likes: 21 },
    { id: "cf257", url: "https://res.cloudinary.com/eksh1jyi/image/upload/v1783965047/portfolio/file_zqbjxq.jpg", category: "Details", likes: 22 },
    { id: "cf258", url: "https://res.cloudinary.com/eksh1jyi/image/upload/v1783965049/portfolio/file_h0mllw.jpg", category: "Ceremony", likes: 23 },
    { id: "cf259", url: "https://res.cloudinary.com/eksh1jyi/image/upload/v1783965054/portfolio/file_brqpge.jpg", category: "Couple Portraits", likes: 24 },
    { id: "cf260", url: "https://res.cloudinary.com/eksh1jyi/image/upload/v1783965058/portfolio/file_ry9avs.jpg", category: "Bride Portraits", likes: 25 },
    { id: "cf261", url: "https://res.cloudinary.com/eksh1jyi/image/upload/v1783965063/portfolio/file_vryk6u.jpg", category: "Candid Moments", likes: 26 },
    { id: "cf262", url: "https://res.cloudinary.com/eksh1jyi/image/upload/v1783965068/portfolio/file_lzethr.jpg", category: "Reception", likes: 27 },
    { id: "cf263", url: "https://res.cloudinary.com/eksh1jyi/image/upload/v1783965073/portfolio/file_nr8bdr.jpg", category: "Details", likes: 28 },
    { id: "cf264", url: "https://res.cloudinary.com/eksh1jyi/image/upload/v1783965078/portfolio/file_jkfh6u.jpg", category: "Ceremony", likes: 29 },
    { id: "cf265", url: "https://res.cloudinary.com/eksh1jyi/image/upload/v1783965083/portfolio/file_zdisca.jpg", category: "Couple Portraits", likes: 30 },
    { id: "cf266", url: "https://res.cloudinary.com/eksh1jyi/image/upload/v1783965088/portfolio/file_e1ehn4.jpg", category: "Bride Portraits", likes: 31 },
    { id: "cf267", url: "https://res.cloudinary.com/eksh1jyi/image/upload/v1783965092/portfolio/file_xuni8z.jpg", category: "Candid Moments", likes: 32 },
    { id: "cf268", url: "https://res.cloudinary.com/eksh1jyi/image/upload/v1783965096/portfolio/file_shhtxk.jpg", category: "Reception", likes: 33 },
    { id: "cf269", url: "https://res.cloudinary.com/eksh1jyi/image/upload/v1783965100/portfolio/file_immvnk.jpg", category: "Details", likes: 34 },
    { id: "cf270", url: "https://res.cloudinary.com/eksh1jyi/image/upload/v1783965104/portfolio/file_kg7rp4.jpg", category: "Ceremony", likes: 35 },
    { id: "cf271", url: "https://res.cloudinary.com/eksh1jyi/image/upload/v1783965109/portfolio/file_cxmtt4.jpg", category: "Couple Portraits", likes: 36 },
    { id: "cf272", url: "https://res.cloudinary.com/eksh1jyi/image/upload/v1783965113/portfolio/file_o2kgkd.jpg", category: "Bride Portraits", likes: 37 },
    { id: "cf273", url: "https://res.cloudinary.com/eksh1jyi/image/upload/v1783965125/portfolio/file_kamlt4.jpg", category: "Candid Moments", likes: 38 },
    { id: "cf274", url: "https://res.cloudinary.com/eksh1jyi/image/upload/v1783965131/portfolio/file_aecjp0.jpg", category: "Reception", likes: 39 },
    { id: "cf275", url: "https://res.cloudinary.com/eksh1jyi/image/upload/v1783965138/portfolio/file_wlui90.jpg", category: "Details", likes: 40 },
    { id: "cf276", url: "https://res.cloudinary.com/eksh1jyi/image/upload/v1783965151/portfolio/file_v5u9mg.jpg", category: "Ceremony", likes: 41 },
    { id: "cf277", url: "https://res.cloudinary.com/eksh1jyi/image/upload/v1783965158/portfolio/file_qclrej.jpg", category: "Couple Portraits", likes: 42 },
    { id: "cf278", url: "https://res.cloudinary.com/eksh1jyi/image/upload/v1783965163/portfolio/file_s6bxys.jpg", category: "Bride Portraits", likes: 43 },
    { id: "cf279", url: "https://res.cloudinary.com/eksh1jyi/image/upload/v1783965167/portfolio/file_umw8tw.jpg", category: "Candid Moments", likes: 44 }
    ],
  },
  {
    id: "destination-collection",
    categoryId: "destination-weddings",
    name: "Destination Collection",
    description: "Exotic destination wedding shoots across beautiful locations.",
    date: "2025-04-20",
    location: "India",
    photographer: "Om",
    coverUrl: "https://res.cloudinary.com/eksh1jyi/image/upload/v1783965171/portfolio/file_obepdu.jpg",
    isPublic: true,
    favorites: [],
    isFeatured: false,
    photos: [
    { id: "cf280", url: "https://res.cloudinary.com/eksh1jyi/image/upload/v1783965171/portfolio/file_obepdu.jpg", category: "Reception", likes: 10 },
    { id: "cf281", url: "https://res.cloudinary.com/eksh1jyi/image/upload/v1783965176/portfolio/file_nnyi1e.jpg", category: "Details", likes: 11 },
    { id: "cf282", url: "https://res.cloudinary.com/eksh1jyi/image/upload/v1783965195/portfolio/file_m8io3w.jpg", category: "Ceremony", likes: 12 },
    { id: "cf283", url: "https://res.cloudinary.com/eksh1jyi/image/upload/v1783965208/portfolio/file_ma70nq.jpg", category: "Couple Portraits", likes: 13 },
    { id: "cf284", url: "https://res.cloudinary.com/eksh1jyi/image/upload/v1783965228/portfolio/file_lf39qg.jpg", category: "Bride Portraits", likes: 14 },
    { id: "cf285", url: "https://res.cloudinary.com/eksh1jyi/image/upload/v1783965242/portfolio/file_laksnh.jpg", category: "Candid Moments", likes: 15 },
    { id: "cf286", url: "https://res.cloudinary.com/eksh1jyi/image/upload/v1783965260/portfolio/file_vm0jq9.jpg", category: "Reception", likes: 16 },
    { id: "cf287", url: "https://res.cloudinary.com/eksh1jyi/image/upload/v1783965263/portfolio/file_wdi1o0.jpg", category: "Details", likes: 17 },
    { id: "cf288", url: "https://res.cloudinary.com/eksh1jyi/image/upload/v1783965265/portfolio/file_sd27zo.jpg", category: "Ceremony", likes: 18 },
    { id: "cf289", url: "https://res.cloudinary.com/eksh1jyi/image/upload/v1783965271/portfolio/file_z4wofd.jpg", category: "Couple Portraits", likes: 19 },
    { id: "cf290", url: "https://res.cloudinary.com/eksh1jyi/image/upload/v1783965277/portfolio/file_ojxw57.jpg", category: "Bride Portraits", likes: 20 },
    { id: "cf291", url: "https://res.cloudinary.com/eksh1jyi/image/upload/v1783965280/portfolio/file_sc0ris.jpg", category: "Candid Moments", likes: 21 },
    { id: "cf292", url: "https://res.cloudinary.com/eksh1jyi/image/upload/v1783965283/portfolio/file_weem2r.jpg", category: "Reception", likes: 22 },
    { id: "cf293", url: "https://res.cloudinary.com/eksh1jyi/image/upload/v1783965289/portfolio/file_anjwlk.jpg", category: "Details", likes: 23 },
    { id: "cf294", url: "https://res.cloudinary.com/eksh1jyi/image/upload/v1783965309/portfolio/file_z798oz.jpg", category: "Ceremony", likes: 24 },
    { id: "cf295", url: "https://res.cloudinary.com/eksh1jyi/image/upload/v1783965315/portfolio/file_yp2ko0.jpg", category: "Couple Portraits", likes: 25 },
    { id: "cf296", url: "https://res.cloudinary.com/eksh1jyi/image/upload/v1783965332/portfolio/file_efws9h.jpg", category: "Bride Portraits", likes: 26 },
    { id: "cf297", url: "https://res.cloudinary.com/eksh1jyi/image/upload/v1783965354/portfolio/file_ca2get.jpg", category: "Candid Moments", likes: 27 },
    { id: "cf298", url: "https://res.cloudinary.com/eksh1jyi/image/upload/v1783965360/portfolio/file_d7ltug.jpg", category: "Reception", likes: 28 },
    { id: "cf299", url: "https://res.cloudinary.com/eksh1jyi/image/upload/v1783965372/portfolio/file_ttkdoh.jpg", category: "Details", likes: 29 },
    { id: "cf300", url: "https://res.cloudinary.com/eksh1jyi/image/upload/v1783965387/portfolio/file_wqm2tk.jpg", category: "Ceremony", likes: 30 },
    { id: "cf301", url: "https://res.cloudinary.com/eksh1jyi/image/upload/v1783965400/portfolio/file_blxxgt.jpg", category: "Couple Portraits", likes: 31 },
    { id: "cf302", url: "https://res.cloudinary.com/eksh1jyi/image/upload/v1783965414/portfolio/file_p4pfoq.jpg", category: "Bride Portraits", likes: 32 },
    { id: "cf303", url: "https://res.cloudinary.com/eksh1jyi/image/upload/v1783965417/portfolio/file_kfvnjx.jpg", category: "Candid Moments", likes: 33 },
    { id: "cf304", url: "https://res.cloudinary.com/eksh1jyi/image/upload/v1783965431/portfolio/file_d2uwvt.jpg", category: "Reception", likes: 34 },
    { id: "cf305", url: "https://res.cloudinary.com/eksh1jyi/image/upload/v1783965438/portfolio/file_zcnank.jpg", category: "Details", likes: 35 },
    { id: "cf306", url: "https://res.cloudinary.com/eksh1jyi/image/upload/v1783965445/portfolio/file_zn3fpc.jpg", category: "Ceremony", likes: 36 }
    ],
  },
];

const STORE_VERSION = "v4_cloudinary_rotated";

export async function getCategories(): Promise<Category[]> {
  const res = await fetch("/api/db/categories");
  if (!res.ok) throw new Error("Failed to fetch categories");
  return res.json();
}

export async function saveCategories(categories: Category[]): Promise<void> {
  // No-op (done via database CRUD now)
}

export async function getGalleries(): Promise<ClientGallery[]> {
  const res = await fetch("/api/db/galleries");
  if (!res.ok) throw new Error("Failed to fetch galleries");
  return res.json();
}

export async function saveGalleries(galleries: ClientGallery[]): Promise<void> {
  // No-op (done via database CRUD now)
}

export async function addCategory(category: Omit<Category, "shootCount" | "order">): Promise<Category> {
  const categories = await getCategories();
  const newCat = {
    ...category,
    shootCount: 0,
    order: categories.length + 1,
  };
  const res = await fetch("/api/db/categories", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(newCat),
  });
  if (!res.ok) throw new Error("Failed to add category");
  return res.json();
}

export async function updateCategory(category: Category): Promise<Category> {
  const res = await fetch(`/api/db/categories/${category.id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(category),
  });
  if (!res.ok) throw new Error("Failed to update category");
  return res.json();
}

export async function deleteCategory(id: string): Promise<void> {
  const res = await fetch(`/api/db/categories/${id}`, {
    method: "DELETE",
  });
  if (!res.ok) throw new Error("Failed to delete category");
}

export async function addGallery(gallery: Omit<ClientGallery, "favorites" | "photos"> & { photos?: Photo[] }): Promise<ClientGallery> {
  const newGal = {
    ...gallery,
    photos: gallery.photos || [],
    favorites: [],
  };
  const res = await fetch("/api/db/galleries", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(newGal),
  });
  if (!res.ok) throw new Error("Failed to add gallery");
  const createdGallery = await res.json();

  // Increment shootCount for parent category
  try {
    const categories = await getCategories();
    const cat = categories.find((c) => c.id === gallery.categoryId);
    if (cat) {
      cat.shootCount = (cat.shootCount || 0) + 1;
      await updateCategory(cat);
    }
  } catch (e) {
    console.error("Failed to update category shootCount:", e);
  }

  return createdGallery;
}

export async function updateGallery(gallery: ClientGallery): Promise<ClientGallery> {
  const res = await fetch(`/api/db/galleries/${gallery.id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(gallery),
  });
  if (!res.ok) throw new Error("Failed to update gallery");
  return res.json();
}

export async function deleteGallery(id: string): Promise<void> {
  const galleries = await getGalleries();
  const gallery = galleries.find((g) => g.id === id);
  if (!gallery) return;

  const res = await fetch(`/api/db/galleries/${id}`, {
    method: "DELETE",
  });
  if (!res.ok) throw new Error("Failed to delete gallery");

  // Decrement shootCount for parent category
  try {
    const categories = await getCategories();
    const cat = categories.find((c) => c.id === gallery.categoryId);
    if (cat && cat.shootCount > 0) {
      cat.shootCount -= 1;
      await updateCategory(cat);
    }
  } catch (e) {
    console.error("Failed to update category shootCount:", e);
  }
}

export interface ClientReel {
  id: string;
  title: string;
  views: string;
  videoUrl: string;
  publicId: string;
  poster: string;
  bytes?: number;
  format?: string;
  originalBytes?: number;
  wasCompressed?: boolean;
}

export async function getReels(): Promise<ClientReel[]> {
  const res = await fetch("/api/db/reels");
  if (!res.ok) throw new Error("Failed to fetch reels");
  return res.json();
}


