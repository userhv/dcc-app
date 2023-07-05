import { ITabelaDisciplinas } from "../../../mediator/mediator";

export const disciplinasUnicas = (disciplinasArray: ITabelaDisciplinas[]) => {
    let disciplinasEncontradas: any = new Set();
    disciplinasArray.forEach((disciplina) => {
      disciplinasEncontradas.add(disciplina.disciplina);

    })
    const arrayDisiciplinas: string[] = Array.from(disciplinasEncontradas);
    ordenaDisciplinas(arrayDisiciplinas);
    return arrayDisiciplinas;
  }
  const ordenaDisciplinas = (disciplinas: string[]) => {
    disciplinas.sort((a,b) => {
      const disciplina_a = a.normalize("NFD").replace(/\p{Diacritic}/gu, "");
      const disicplina_b = b.normalize("NFD").replace(/\p{Diacritic}/gu, "");
      return disciplina_a < disicplina_b ? -1: disciplina_a > disicplina_b ? 1 : 0;
    })
  }
