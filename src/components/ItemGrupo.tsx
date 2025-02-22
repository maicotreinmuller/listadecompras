import { StyleSheet } from "react-nativescript";
import * as React from "react";
import { Item } from "../types/ShoppingList";
import { formatarMoeda } from "../utils/formatters";
import { colors } from "../styles/colors";

type ItemGrupoProps = {
  item: Item;
  onToggleComplete: (id: number) => void;
  onSelect: (id: number) => void;
  selecionado: boolean;
  onQuantidadeChange: (id: number, quantidade: number) => void;
  onValorChange: (id: number, valor: number) => void;
};

export function ItemGrupo({
  item,
  onToggleComplete,
  onSelect,
  selecionado,
  onQuantidadeChange,
  onValorChange
}: ItemGrupoProps) {
  const [editandoQuantidade, setEditandoQuantidade] = React.useState(false);
  const [editandoValor, setEditandoValor] = React.useState(false);
  const [novaQuantidade, setNovaQuantidade] = React.useState(item.quantidade.toString());
  const [novoValor, setNovoValor] = React.useState(item.valor.toString());

  return (
    <stackLayout 
      style={[
        styles.grupo,
        selecionado ? styles.selecionado : null,
        item.completo ? styles.completo : null
      ]}
      onTap={() => onSelect(item.id)}
    >
      <gridLayout rows="auto" columns="auto, *, auto">
        <button
          col="0"
          text={item.completo ? "✓" : "○"}
          onTap={() => onToggleComplete(item.id)}
          style={[
            styles.checkButton,
            item.completo ? styles.checkButtonActive : null
          ]}
        />
        <stackLayout col="1">
          <label style={[
            styles.nome,
            item.completo ? styles.nomeCompleto : null
          ]}>{item.nome}</label>
          {item.valor > 0 && (
            <label style={styles.precoUnitario}>
              {formatarMoeda(item.valor)} cada
            </label>
          )}
        </stackLayout>
      </gridLayout>

      <gridLayout rows="auto" columns="auto, *, auto" style={styles.detalhes}>
        <stackLayout col="0">
          {editandoQuantidade ? (
            <gridLayout columns="*, auto">
              <textField
                col="0"
                keyboardType="number"
                text={novaQuantidade}
                onTextChange={(e) => setNovaQuantidade(e.value)}
                style={styles.input}
              />
              <button
                col="1"
                text="OK"
                onTap={() => {
                  onQuantidadeChange(item.id, parseInt(novaQuantidade) || 1);
                  setEditandoQuantidade(false);
                }}
                style={styles.confirmButton}
              />
            </gridLayout>
          ) : (
            <button
              text={`${item.quantidade} un`}
              onTap={() => setEditandoQuantidade(true)}
              style={styles.infoButton}
            />
          )}
        </stackLayout>

        <stackLayout col="1">
          {editandoValor ? (
            <gridLayout columns="*, auto">
              <textField
                col="0"
                keyboardType="number"
                hint="0.00"
                text={novoValor}
                onTextChange={(e) => setNovoValor(e.value)}
                style={styles.input}
              />
              <button
                col="1"
                text="OK"
                onTap={() => {
                  onValorChange(item.id, parseFloat(novoValor.replace(',', '.')) || 0);
                  setEditandoValor(false);
                }}
                style={styles.confirmButton}
              />
            </gridLayout>
          ) : (
            <button
              text={formatarMoeda(item.valor)}
              onTap={() => setEditandoValor(true)}
              style={styles.infoButton}
            />
          )}
        </stackLayout>

        <label col="2" style={styles.total}>
          {formatarMoeda(item.quantidade * item.valor)}
        </label>
      </gridLayout>
    </stackLayout>
  );
}

const styles = StyleSheet.create({
  grupo: {
    margin: 8,
    padding: 16,
    backgroundColor: colors.white,
    borderRadius: 12,
    elevation: 2,
    shadowColor: colors.gray[400],
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
  },
  selecionado: {
    borderColor: colors.primary,
    borderWidth: 2,
  },
  completo: {
    backgroundColor: colors.gray[100],
    opacity: 0.8,
  },
  nome: {
    fontSize: 18,
    fontWeight: "bold",
    color: colors.secondary,
  },
  nomeCompleto: {
    textDecorationLine: "line-through",
    color: colors.gray[600],
  },
  precoUnitario: {
    fontSize: 12,
    color: colors.gray[600],
    marginTop: 2,
  },
  detalhes: {
    marginTop: 12,
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: colors.gray[200],
  },
  checkButton: {
    fontSize: 22,
    backgroundColor: "transparent",
    width: 40,
    height: 40,
    padding: 0,
    color: colors.gray[400],
    borderWidth: 2,
    borderColor: colors.gray[400],
    borderRadius: 20,
    marginRight: 8,
  },
  checkButtonActive: {
    backgroundColor: colors.success,
    borderColor: colors.success,
    color: colors.white,
  },
  input: {
    fontSize: 16,
    padding: 8,
    backgroundColor: colors.gray[100],
    borderRadius: 8,
    borderWidth: 0,
  },
  confirmButton: {
    fontSize: 14,
    backgroundColor: colors.primary,
    color: colors.white,
    padding: 8,
    borderRadius: 8,
    marginLeft: 8,
  },
  infoButton: {
    fontSize: 16,
    backgroundColor: colors.gray[100],
    color: colors.secondary,
    padding: 8,
    borderRadius: 8,
    minWidth: 80,
    textAlignment: "center",
  },
  total: {
    fontSize: 18,
    fontWeight: "bold",
    color: colors.primary,
    textAlignment: "right",
  },
});