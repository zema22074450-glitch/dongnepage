(function(){
  const KEY = "CATEGORY_LIST";
  const DEFAULT_CATEGORIES = ["국밥", "일식", "중식", "고기", "카페", "Bar / Pocha (술집)"];
  const LEGACY_CATEGORY_MAP = {
    "술집": "Bar / Pocha (술집)",
    "술집·포차": "Bar / Pocha (술집)"
  };
  const CATEGORY_LABEL_MAP = {
    "Bar / Pocha (술집)": "술집·포차"
  };

  function normalizeCategory(value){
    const raw = String(value || "").trim();
    return LEGACY_CATEGORY_MAP[raw] || raw;
  }

  function displayCategory(value){
    const normalized = normalizeCategory(value);
    return CATEGORY_LABEL_MAP[normalized] || normalized;
  }

  function normalizeCategoryList(list){
    if(!Array.isArray(list)) return [];
    return [...new Set(list.map(normalizeCategory).filter(Boolean))];
  }

  function loadCategories(){
    const raw = localStorage.getItem(KEY);
    if(!raw){
      localStorage.setItem(KEY, JSON.stringify(DEFAULT_CATEGORIES));
      return [...DEFAULT_CATEGORIES];
    }
    try{
      const parsed = JSON.parse(raw);
      const normalized = normalizeCategoryList(parsed);
      if(normalized.length){
        localStorage.setItem(KEY, JSON.stringify(normalized));
        return normalized;
      }
    }catch(e){}

    localStorage.setItem(KEY, JSON.stringify(DEFAULT_CATEGORIES));
    return [...DEFAULT_CATEGORIES];
  }

  function saveCategories(categories){
    const normalized = normalizeCategoryList(categories);
    localStorage.setItem(KEY, JSON.stringify(normalized.length ? normalized : DEFAULT_CATEGORIES));
    return normalized;
  }

  function categoryDescription(cat){
    const map = {
      "국밥": "국밥 맛집 모아보기",
      "일식": "초밥/회/라멘 모아보기",
      "중식": "짜장/짬뽕/탕수육 모아보기",
      "고기": "삼겹/갈비 맛집 모아보기",
      "카페": "커피/디저트 모아보기",
      "Bar / Pocha (술집)": "술집·포차 모아보기"
    };
    return map[cat] || `${cat} 맛집 모아보기`;
  }

  const categoryImageMap = {
    "국밥": "/images/e7c4388f-4efd-417d-9a75-96d7ff627b86.png",
    "일식": "/images/dae7e9b3-001d-4cf2-afb0-82189ace540d.png",
    "중식": "/images/b5e07f79-8873-46a9-8a37-671f7e5c55b9.png",
    "고기": "/images/022ae54c-e43a-4d5f-979d-bfe29fc5fcd7.png",
    "카페": "/images/c2853582-352a-4d5a-ad27-1d2ec1474eb1.png",
    "Bar / Pocha (술집)": "/images/0a6acd83-5557-47a8-9ee7-7976ab1a9f37.png"
  };

  window.CategoryStore = {
    KEY,
    DEFAULT_CATEGORIES,
    normalizeCategory,
    displayCategory,
    loadCategories,
    saveCategories,
    categoryDescription,
    categoryImageMap
  };
})();
