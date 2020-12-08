package scraper;

import java.util.ArrayList;

public class GeneSpec {
	
	private ArrayList<Spec> gene;
	private double fitting;
	
	public GeneSpec (ArrayList<Spec> data) {
		this.gene = data;
		this.fitting = -1;
	}
	
	public ArrayList<Spec> getGene() {
		return gene;
	}

	public void mutate(Spec spec) {
		int index = randomInt(0,gene.size());
		mutate(spec, index);
	}
	
	public void mutate(Spec element, int index) {
			gene.set(index, element);
	}
	
	public static int randomInt(int Min, int Max){
	     return (int) (Math.random()*(Max-Min))+Min;
	}
	
	public ArrayList<GeneSpec> crossover(GeneSpec genitore2) {

		//Genero il primo figlio
		ArrayList<Spec> son1 = new ArrayList<Spec>();
		for(int i = 0; i < this.getGene().size()/2; i++){
			son1.add(gene.get(i));
		}
		for(int i = 0; i < genitore2.getGene().size()/2; i++){
			son1.add(genitore2.getGene().get(i));
		}

		//Genero il secondo figlio
		ArrayList<Spec> son2 = new ArrayList<Spec>();
		for(int i = 0; i < this.getGene().size()/2; i++){
			son2.add(gene.get(i));
		}
		for(int i = 0; i < genitore2.getGene().size()/2; i++){
			son2.add(genitore2.getGene().get(i));
		}

		ArrayList<GeneSpec> sons = new ArrayList<>();
		sons.add(new GeneSpec(son1));
		sons.add(new GeneSpec(son2));

		return sons;
	}
	
	public double calculateFitting(double performance, double camera, double display) {
		for(Spec spec: gene) {
			this.fitting += spec.getFit(performance, camera, display);
		}
		return this.fitting;
	}

	
	
	public String toString() {
		String string = "Individuo con " +gene.size() + " elementi";
		for(Spec spec: gene) {
			string += "\n"+spec.toString();
		}
		return string;
	}
	
	public double getFitting() {
		return this.fitting;
	}
	
}